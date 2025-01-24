# Seven Segment Display Web Component

A seven-segment display web component, rendered as a SVG.

![seven-segment](https://github.com/user-attachments/assets/59658688-e9ea-4720-bfd7-2fc7b5044719)

The shape of the segments is based on the shape used on the first Casio G-SHOCK, the [DW-5000C](https://gshock.casio.com/intl/products/collection/origin/5000_5600/).

## React

If using it in React, you can wrap it in a component like this:

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

export default SevenSegmentCasio;
```
