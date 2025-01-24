# Seven Segment Display Web Component

A seven-segment display web component, rendered as a SVG. Animated GIF screenshot below:

![seven-segment](https://github.com/user-attachments/assets/59658688-e9ea-4720-bfd7-2fc7b5044719)

The shape of the segments is based on the shape used on the first Casio G-SHOCK, the [DW-5000C](https://gshock.casio.com/intl/products/collection/origin/5000_5600/).

## React

If using in React, you can wrap it in a component like this:

```jsx
import React, { useEffect, useRef } from 'react';
import './seven-segment.js';

const SevenSegment = ({ value, height, color }) => {
  const segmentRef = useRef(null);

  useEffect(() => {
    if (segmentRef.current) {
      segmentRef.current.setAttribute('value', value);
      segmentRef.current.setAttribute('height', height);
      segmentRef.current.setAttribute('color', color);
    }
  }, [value, height, color]);

  return <seven-segment-casio ref={segmentRef}></seven-segment-casio>;
};

export default SevenSegment;
```

## HTML

Add the following script tag to your HTML file:

```html
<script type="module" src="./seven-segment.js"></script>
```

Then you can use the component like this:

```html
<seven-segment
  id="digit-0"
  value="0"
  height="300"
  color="black"
></seven-segment>
```

This is how it is used in `index.html` in this repository.
