---
title: Test
---

## This is a test

---

Let's try some Tex
```tex
x(t) = A \cdot \cos(2\pi \cdot f \cdot t + \phi)
```

Let's visualize it:

```js
import * as Plot from "npm:@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";
```

```js
let frequency = view(Inputs.range([1, 20], {
  label: "Frequency",
  value: 5,
  step: 0.1
}))

let amplitude = view(Inputs.range([0, 2], {
  label: "Amplitude",
  value: 1,
  step: 0.01
}))

let phase = view(Inputs.range([0, 2 * Math.PI], {
  label: "Phase",
  value: 0,
  step: 0.01
}))
```

```js
Plot.plot({
  x: {
    label: "t"
  },
  y: {
    label: "x(t)",
    domain: [-amplitude, amplitude]
  },
  marks: [
    Plot.line(
      d3.range(0, 1, 0.001),
      {
        x: t => t,
        y: t => amplitude * Math.cos(
          2 * Math.PI * frequency * t + phase
        )
      }
    )
  ]
})
```