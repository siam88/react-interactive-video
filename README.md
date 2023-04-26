[![wakatime](https://wakatime.com/badge/github/siam88/react-interactive-video.svg)](https://wakatime.com/badge/github/siam88/react-interactive-video)

## React Interactive Video

React Interactive Video is a library that enables you to create interactive videos using React.

### Getting Started

To get started with React Interactive Video, you can clone the repository from GitHub:

```
git clone https://github.com/siam88/react-interactive-video.git
```

### Prerequisites

React Interactive Video requires the following dependencies to be installed:

- React (>=16.8.0)
- react-dom (>=16.8.0)
- video.js (>=7.5.4)
- prop-types (>=15.7.2)

You can install these dependencies using npm:

```
npm install --save react react-dom video.js prop-types
```

### Installing

To install React Interactive Video, you can run the following command:

```
npm install --save react-interactive-video
```

### Usage

To use React Interactive Video, you can import it in your React component:

```javascript
import React from 'react';
import InteractiveVideo from 'react-interactive-video';

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'https://example.com/path/to/video.mp4',
    type: 'video/mp4',
  }],
};

const hotspots = [{
  startTime: 5,
  endTime: 10,
  top: '10%',
  left: '10%',
  width: '30%',
  height: '30%',
  onClick: () => console.log('Hotspot clicked!'),
}];

const App = () => (
  <InteractiveVideo videoJsOptions={videoJsOptions} hotspots={hotspots} />
);

export default App;
```

In the above example, `videoJsOptions` are the options for the video player, and `hotspots` are the interactive elements that will be overlaid on the video.

### Props

React Interactive Video accepts the following props:

- `videoJsOptions`: Options for the video player. Required.
- `hotspots`: An array of hotspot objects. Each hotspot object should have the following properties:
  - `startTime`: The start time of the hotspot in seconds. Required.
  - `endTime`: The end time of the hotspot in seconds. Required.
  - `top`: The top position of the hotspot as a percentage of the video height. Required.
  - `left`: The left position of the hotspot as a percentage of the video width. Required.
  - `width`: The width of the hotspot as a percentage of the video width. Required.
  - `height`: The height of the hotspot as a percentage of the video height. Required.
  - `onClick`: A function that will be called when the hotspot is clicked. Optional.

### Contributing

Contributions to React Interactive Video are welcome! To contribute, please fork the repository and submit a pull request.

### License

React Interactive Video is licensed under the MIT License. See the `LICENSE` file for more information.
