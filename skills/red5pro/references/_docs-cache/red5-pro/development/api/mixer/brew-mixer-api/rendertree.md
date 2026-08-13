_From: Brew Mixer API_

## RenderTree {#RenderTree}
A RenderTree is a node graph that describes how the audio and video sources are combined within the mixer. The RenderTree describes the output of one mixer video stream -- one sub-mix. A given event may consist of multiple simultaneous sub-mixes and thus uses mutliple RenderTrees.

A RenderTree has two branches: there is an audio sub-tree and a video sub-tree.

![Audio Render Tree](/_images/red5-pro/development/api/mixers/audioRenderTree.png)
*Audio RenderTree*

![Video Render Tree](/_images/red5-pro/development/api/mixers/videoRenderTree.png)
*Video RenderTree*
