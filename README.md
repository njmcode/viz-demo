# viz-demo - 'Browser Audio Visualization'

Slideshow & example code for my [BelfastJS December 2017](https://www.meetup.com/Belfast-JS/events/245183528) lightning talk.

Built and tested on Chrome, YMMV on other platforms (yes, I know).

## Installation

- Install [Node](https://nodejs.org/en/) (including npm).
- `npm install` from the directory root.
- `npm run start` to build and start the Webpack dev server on the default port (likely 8080). Webpack will watch and re-build on change.
- Visit `localhost:8080` to run the slideshow.
- Choose your input mechanism from the control panel:
  - **Mic** - uses your default microphone (requires permission).
  - **Music** - will play an [audio file](https://freepd.com/Electronic/Rain%20-%20remastered) from the project.

## Controls

- Left and right arrow keys will switch slides during the demo.
- Browser history can be used to go back/forward between slides.
- Slide position and time remaining will be persisted to `localStorage` if available.

## About the project

Built with [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) to provide the following:

- ES6 JavaScript module transpilation (via `babel-loader`)
- `static` properties on classes (via `transform-class-properties`)
- Object spread operator (via `transform-object-rest-spread`)
- [CSS Modules](https://github.com/css-modules/css-modules) (via `css-loader`)
- `import` handling of example/snippet files and assets (via `file-loader` and `raw-loader`)

Syntax highlighting courtesy of [PrismJS](http://prismjs.com/).

The project includes my own lint setup (via [`babel-eslint`](https://github.com/babel/babel-eslint)). There is no CSS linting so your editor may complain about CSS Modules syntax (`@value` etc).

This was intended to be a quick two-page demo but really got out of hand. Protip: don't write your own slide handler. (Will spin the `/core` stuff into standalone modules later.)

## TODO

- [ ] Host project on GitHub Pages
- [ ] Improve sizing of items in view
- [ ] Better documentation
- [ ] Add autoprefixer & babel-env config for better cross-browser support
- [ ] Handle errors
- [ ] Profile for perf/GC etc & refactor
- [ ] Bug: timer stays in red alert even if reset (requires refresh)
