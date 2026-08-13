import { existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { x as extractTar } from 'tar';

const REPO = process.env.RED5PRO_SKILLS_REPO || 'red5pro/red5pro-skills';
const BRANCH = process.env.RED5PRO_SKILLS_BRANCH || 'main';
const TARBALL_URL = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/${BRANCH}`;
const FETCH_TIMEOUT_MS = 30_000;

const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
};

/**
 * Each target describes where to install this repo's skills/ directory for one AI tool.
 * `dir`: destination skills folder, relative to homedir() unless absolute.
 * `detect`: optional () => boolean — if true, the target is offered as a default.
 *
 * Only folder-based skill tools are listed here (Cursor/Windsurf/Copilot use a single
 * flat instructions file and can't hold SKILL.md + references/ subdirectories).
 */
const TARGETS = {
  'claude-code': {
    label: 'Claude Code',
    dir: '.claude/skills',
    detect: () => existsSync(join(homedir(), '.claude')),
    note: 'User-level skills — load in every Claude Code session.',
  },
  'claude-code-project': {
    label: 'Claude Code (this project only)',
    dir: resolve(process.cwd(), '.claude/skills'),
    absolute: true,
    detect: () => existsSync(resolve(process.cwd(), '.claude')),
    note: 'Project-level skills — load only when working in this directory.',
  },
  codex: {
    label: 'OpenAI Codex / Codex CLI',
    dir: '.codex/skills',
    detect: () => existsSync(join(homedir(), '.codex')),
    note: 'User-level Codex skills.',
  },
};

function parseArgs(argv) {
  const args = { positional: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') args.flags.help = true;
    else if (a === '--version' || a === '-v') args.flags.version = true;
    else if (a === '--yes' || a === '-y') args.flags.yes = true;
    else if (a === '--target') args.flags.target = argv[++i];
    else if (a.startsWith('--target=')) args.flags.target = a.slice('--target='.length);
    else if (a === '--list-targets') args.flags.listTargets = true;
    else args.positional.push(a);
  }
  return args;
}

function printHelp() {
  stdout.write(`
${c.bold('red5pro-skills')} — install Red5's AI skills into your coding tool

${c.bold('Usage:')}
  npx red5pro-skills [options]

${c.bold('Options:')}
  --target <name>    Install target (skip prompt). One of:
                       ${Object.keys(TARGETS).join(', ')}
  --list-targets     List supported targets and exit
  -y, --yes          Accept defaults / overwrite without prompting
  -h, --help         Show this help
  -v, --version      Show wizard version

${c.bold('Environment:')}
  RED5PRO_SKILLS_REPO    Override the source repo (default: ${REPO})
  RED5PRO_SKILLS_BRANCH  Override the source branch (default: ${BRANCH})

${c.bold('Examples:')}
  npx red5pro-skills
  npx red5pro-skills --target claude-code -y
  npx red5pro-skills --target claude-code-project

${c.dim('Docs: https://github.com/red5pro/red5pro-skills')}
`);
}

function listTargets() {
  stdout.write(`${c.bold('Supported targets:')}\n`);
  for (const [key, t] of Object.entries(TARGETS)) {
    const detected = t.detect && t.detect() ? c.green(' [detected]') : '';
    stdout.write(`  ${c.cyan(key.padEnd(22))} ${t.label}${detected}\n`);
    stdout.write(`  ${c.dim(' '.repeat(22) + ' ' + t.note)}\n`);
  }
}

function resolveTargetDir(target) {
  return target.absolute ? target.dir : join(homedir(), target.dir);
}

async function chooseTarget(rl, preselected) {
  if (preselected) {
    if (!TARGETS[preselected]) throw new Error(`Unknown target: ${preselected}. Run with --list-targets to see options.`);
    return preselected;
  }

  const entries = Object.entries(TARGETS);
  const detected = entries.map(([, t]) => Boolean(t.detect && t.detect()));
  const detectedIdx = detected.indexOf(true);

  stdout.write(`\n${c.bold('Where should I install the Red5 skills?')}\n\n`);
  entries.forEach(([, t], i) => {
    const tag = detected[i] ? c.green(' [detected]') : '';
    const star = i === detectedIdx ? c.cyan('*') : ' ';
    stdout.write(`  ${star} ${String(i + 1).padStart(2)}. ${t.label}${tag}\n`);
  });
  stdout.write('\n');

  const defaultIdx = detectedIdx >= 0 ? detectedIdx + 1 : 1;
  const answer = (await rl.question(`Choose [1-${entries.length}] (default: ${defaultIdx}): `)).trim();
  const choice = answer === '' ? defaultIdx : Number.parseInt(answer, 10);
  if (!Number.isFinite(choice) || choice < 1 || choice > entries.length) {
    throw new Error(`Invalid choice: ${answer}`);
  }
  return entries[choice - 1][0];
}

async function confirmOverwrite(rl, destDir, yes) {
  if (yes || !existsSync(destDir)) return true;
  const entries = await readdir(destDir).catch(() => []);
  if (entries.length === 0) return true;
  const ans = (await rl.question(
    `${c.yellow('!')} ${destDir} already has content — files with matching names may be overwritten. Continue? [y/N]: `,
  )).trim().toLowerCase();
  return ans === 'y' || ans === 'yes';
}

/**
 * Downloads the repo tarball and extracts only skills/* into destDir, stripping the
 * "<repo>-<branch>/skills/" prefix. One HTTP request regardless of file count (the repo
 * has 1000+ files under skills/, mostly a docs cache — fetching them individually via the
 * GitHub API would mean 1000+ requests).
 */
async function installSkills(destDir) {
  let res;
  try {
    res = await fetch(TARBALL_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      throw new Error(
        `Timed out after ${FETCH_TIMEOUT_MS}ms fetching ${TARBALL_URL}. ` +
        `Check connectivity or override the source with RED5PRO_SKILLS_REPO/RED5PRO_SKILLS_BRANCH.`,
      );
    }
    throw new Error(`Network error fetching ${TARBALL_URL}: ${err.message}`);
  }
  if (!res.ok || !res.body) {
    throw new Error(
      `Failed to fetch ${TARBALL_URL} (HTTP ${res.status}). ` +
      `Check RED5PRO_SKILLS_REPO/RED5PRO_SKILLS_BRANCH if you overrode them.`,
    );
  }

  await mkdir(destDir, { recursive: true });

  const repoName = REPO.split('/')[1];
  const rootPrefix = `${repoName}-${BRANCH}/skills/`;
  const installed = new Set();

  await pipeline(
    Readable.fromWeb(res.body),
    extractTar({
      cwd: destDir,
      strip: rootPrefix.split('/').length - 1,
      filter: (path) => {
        if (!path.startsWith(rootPrefix)) return false;
        const rel = path.slice(rootPrefix.length);
        const skillName = rel.split('/')[0];
        if (skillName) installed.add(skillName);
        return true;
      },
    }),
  );

  return [...installed].sort();
}

export async function run(argv) {
  const args = parseArgs(argv);

  if (args.flags.help) return printHelp();
  if (args.flags.version) {
    const require = createRequire(import.meta.url);
    const { version } = require('../package.json');
    stdout.write(`${version}\n`);
    return;
  }
  if (args.flags.listTargets) return listTargets();

  stdout.write(`\n${c.bold(c.cyan('Red5 Skills installer'))}\n`);
  stdout.write(c.dim(`Source: https://github.com/${REPO} (${BRANCH})\n`));

  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const targetKey = await chooseTarget(rl, args.flags.target);
    const target = TARGETS[targetKey];
    const destDir = resolveTargetDir(target);

    if (!(await confirmOverwrite(rl, destDir, args.flags.yes))) {
      stdout.write(c.yellow('Cancelled.\n'));
      return;
    }

    stdout.write(`\n${c.dim(`→ Downloading skills from ${REPO}@${BRANCH}...`)}\n`);
    const installed = await installSkills(destDir);
    if (installed.length === 0) {
      throw new Error(
        `No skills found under skills/ in ${REPO}@${BRANCH}. ` +
        `Check RED5PRO_SKILLS_REPO/RED5PRO_SKILLS_BRANCH if you overrode them.`,
      );
    }

    stdout.write(c.green(`✓ Installed ${installed.length} skill(s) to ${destDir}:\n`));
    for (const name of installed) stdout.write(`  - ${name}\n`);
    printNextSteps(target);
  } finally {
    rl.close();
  }
}

function printNextSteps(target) {
  stdout.write(`\n${c.bold('Next steps:')}\n`);
  stdout.write(`  - Restart ${target.label} so it picks up the new skills.\n`);
  stdout.write(`  - Ask your agent about Red5 Pro setup, streaming protocols, or SDKs to see routing in action.\n\n`);
}
