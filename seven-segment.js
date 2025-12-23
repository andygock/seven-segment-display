(() => {
  "use strict";

  // Mapping of characters to their corresponding segments on a seven-segment display
  const charMap = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1],
    "@": [1, 1, 1, 1, 1, 0, 1],
    a: [1, 1, 1, 0, 1, 1, 1],
    b: [0, 0, 1, 1, 1, 1, 1],
    c: [1, 0, 0, 1, 1, 1, 0],
    d: [0, 1, 1, 1, 1, 0, 1],
    e: [1, 0, 0, 1, 1, 1, 1],
    f: [1, 0, 0, 0, 1, 1, 1],
    "-": [0, 0, 0, 0, 0, 0, 1],
    " ": [0, 0, 0, 0, 0, 0, 0],
  };

  // svg segment paths, for each segment, from a to g
  const svgSegmentPaths = [
    '<path class="segment" d="M 378.36958,64.111277 301.46617,166.01106 177.96128,165.04213 c 0,0 -55.87532,-55.87532 -89.46511,-88.173194 24.14266,-12.273191 35.11085,-14.512189 50.38468,-14.695532 59.26405,-0.711389 239.48873,1.937873 239.48873,1.937873 z" />',
    '<path class="segment" d="m 391.45021,67.825532 c 24.54639,21.316596 31.65192,27.130213 30.36,66.533618 -1.29191,39.4034 -2.58383,144.04851 -3.22978,166.01106 -0.64596,21.96256 -4.52171,34.23575 -16.7949,48.44681 -12.27319,14.21107 -18.08681,14.85702 -18.08681,14.85702 0,0 -46.18595,-34.23574 -79.12978,-39.4034 1.29191,-29.71405 4.19872,-146.30936 4.19872,-146.30936 z" />',
    '<path class="segment" d="m 294.5566,430.20766 c 0,0 46.50893,-9.0434 90.43404,-43.27915 33.58979,38.75745 27.13021,30.36 23.90042,96.24766 -3.22978,65.88766 -8.39744,131.12936 -10.98127,150.50809 -2.58383,19.37872 -8.39745,63.94978 -43.27915,79.45276 -18.08681,-32.94383 -68.47149,-109.81276 -68.47149,-109.81276 z" />',
    '<path class="segment" d="m 275.82383,614.30553 62.01191,99.47511 h -230.6068 c -20.369825,0 -52.968514,8.20386 -72.993195,-51.87018 C 92.371915,636.71812 155.67574,616.2434 155.67574,616.2434 Z" />',
    '<path class="segment" d="m 155.02979,429.5617 -5.81362,175.05447 -115.599667,41.34128 c 0,0 6.432859,-164.07319 5.786901,-188.61958 -0.645957,-24.54638 15.234017,-52.14837 36.173617,-71.0955 31.005959,21.35678 32.297869,23.29465 79.452769,43.31933 z" />',
    '<path class="segment" d="m 79.476395,85.871048 93.635985,89.068372 c 0,0 -8.0325,129.1066 -7.57574,148.29056 -24.20833,4.11084 -50.45585,9.90296 -85.169677,40.96269 -32.886784,-31.16945 -31.036786,-50.85469 -31.036787,-75.06303 -1e-6,-37.023 8.221696,-131.09037 10.04874,-156.66898 1.827043,-25.57861 20.097479,-46.589612 20.097479,-46.589612 z" />',
    '<path class="segment" d="m 87.642683,374.65532 c 0,0 42.840717,-38.75745 77.722427,-39.40341 34.8817,-0.64595 100.64234,-2.58382 119.50212,-1.29191 18.85979,1.29191 60.72,13.56511 91.08,40.04936 -35.52766,26.48426 -74.93106,43.92511 -111.75063,44.57107 -36.81958,0.64595 -45.21703,-0.64596 -81.39064,0 -36.17362,0.64595 -95.163277,-43.92511 -95.163277,-43.92511 z" />',
  ];

  // Function to convert a character to its corresponding segments
  function charToSegments(char) {
    return charMap[char] || charMap["-"];
  }

  // Define a custom web component for a seven-segment display
  class SevenSegmentElement extends HTMLElement {
    // Specify the attributes to observe for changes
    static get observedAttributes() {
      return ["value", "height", "color"];
    }

    // Constructor to initialize the component
    constructor() {
      super();
    }

    connectedCallback() {
      // Initialize from attributes if present, otherwise use defaults
      const attrValue = this.getAttribute("value");
      const attrHeight = this.getAttribute("height");
      const attrColor = this.getAttribute("color");

      this.value = attrValue !== null ? attrValue : " ";
      this.height = attrHeight !== null ? parseInt(attrHeight, 10) : 260;
      this.color = attrColor !== null ? attrColor : "black";

      const shadow = this.attachShadow({ mode: "open" });
      this.render(shadow);
    }

    // Callback when an observed attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (name === "value") this.value = newValue || "-";
        if (name === "height") this.height = parseInt(newValue || "260", 10);
        if (name === "color") this.color = newValue || "black";
        this.render(this.shadowRoot); // Re-render the component with new attributes
      }
    }

    // Render the SVG representation of the seven-segment display
    render(shadow) {
      const segmentsActive = charToSegments(this.value.toString());
      const svg = `
      <svg
        version="1.1"
        height="${this.height}"
        viewBox="0 0 389.36755 653.11078"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .segment {
            fill: ${this.color};
            stroke: none;
          }
        </style>
        <g id="layer2" transform="translate(-33.087887,-61.552025)">
          ${segmentsActive
            .map((active, index) => (active ? svgSegmentPaths[index] : ""))
            .join("")}
        </g>
      </svg>
    `;

      if (shadow) {
        shadow.innerHTML = svg;
      }
    }
  }

  // Define the custom element
  customElements.define("seven-segment", SevenSegmentElement);
})();
