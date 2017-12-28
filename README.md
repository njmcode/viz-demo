# viz-demo - 'Browser Audio Visualization'

Slideshow code for my BelfastJS lightning talk session, December 2017.

Built and tested on Chrome, YMMV on other platforms.

## Quick start

- Install Node and npm.
- `npm install` from the directory root.
- `npm run start` to build and start the Webpack dev server on the default port (likely 8080). Webpack will watch and re-build on change.
- Visit `localhost:8080` to run the slideshow.
- Choose your input mechanism from the control panel:
  - **Mic** - uses your default microphone (requires permission)
  - **Music** - will play an audio file from the project

## Controls

- Left and right arrow keys will switch slides during the demo.
- Browser history can be used to go back/forward between slides.
- Slide position and time remaining will be persisted to localStorage if available.
