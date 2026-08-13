_From: Brew Mixer API_

## API Versions

The BrewMixer API is available in two versions:

- **1.0 API**: `/brewmixer/1.0/` - Original mixer API
- **2.0 API**: `/brewmixer/2.0/mixers/` - Synonym for 1.0 mixer operations (same functionality, alternate path structure)

Additionally, version 2.0 introduces a new image management endpoint:

- **Images API**: `/brewmixer/2.0/images/` - Upload and manage static images for use with `ImageSourceNode` (new in 2.0)

All mixer operation endpoints shown below are available at both paths. For example:
- `POST /brewmixer/1.0/${eventName}` (1.0 path)
- `POST /brewmixer/2.0/mixers/${eventName}` (2.0 path)

Both paths work identically for mixer operations.
