---
title: Sine and Cosine
---

[Disclaimer](/disclaimer)

# Sine and Cosine

---

I want to write a quick refresher about ${tex`\sin(\theta)`} and ${tex`\cos(\theta)`}. Two really important functions regarding digital signal processing (among many others), and they will even help us, when the time comes, to understand complex number multiplication, exponentiation, and much more.

Before we can explore these concepts, let's first understand what sine and cosine represent. We are going to see how trigonometry emerge from a circle instead of a triangle, since this is the definition that survives generalization and will be most useful to us in the future.

The origin of sine, cosine, and other trigonometric functions seems to be tied to astronomy and calculating distances.  
Greek astronomers and mathematicians (most notably Hipparchus and Ptolemy) used a segment joining two points on a circle, called a chord, to define the first form of trigonometric functions.  
Ptolemy used a circle with a diameter of 120 units. Given an angle ${tex`\theta`}, as it goes from
${tex`0`} to ${tex`\pi`} radians, the chord of an arc of ${tex`\theta`} goes from 0 to 120 (the diameter of the circle).

```js
import * as JXG from "jsxgraph";
```

```js
{
    const div = html`<div style="width: 400px; height: 400px;">`;

    const board = JXG.JSXGraph.initBoard(div, {
        boundingbox: [-170, 170, 170, -170], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });

    const center = board.create("point", [0, 0], {name: "", fixed: true, size: 2});
    const circle = board.create("circle", [center, 120], {strokeColor: "gray", strokeOpacity: 0.4});
    const p0 = board.create("point", [120, 0], {name: "", fixed: true, size: 2});
    const p1 = board.create("glider", [Math.cos(Math.PI / 3) * 120, Math.sin(Math.PI / 3) * 120, circle],
        {name: "", size: 4, color: "steelblue"});

    board.create("segment", [center, p0], {strokeColor: "gray", strokeOpacity: 0.4});
    board.create("segment", [center, p1], {strokeColor: "gray", strokeOpacity: 0.4});
    const angle = board.create("angle", [p0, center, p1], {
        radius: 20.0, 
        name: "θ"
    });
    angle.setAttribute({
        name: () => `θ = ${Math.round((angle.Value() + Number.EPSILON) * 100) / 100}`
    })
    board.create("segment", [p0, p1], {
        strokeColor: "steelblue", 
        strokeWidth: 2,
        name: () => `chord = ${Math.round((120.0 * Math.sin(angle.Value() / 2.0) + Number.EPSILON) * 100) / 100}`,
        withLabel: true,
        label: {
            autoPosition: true,
            distance: 20,
            strokeColor: "steelblue", 
        }
    });

    display(div);
}
```

From now on, let's work with a unit circle instead of a circle with an arbitrary diameter. Let's also write the Greek chord function as
${tex`\text{crd}(\theta)`}, giving us the length of the chord of an arc of ${tex`\theta`} on the unit circle.

Drawing two radii from the center to each end of the chord forms an isosceles triangle, as shown in the figure above.
We can then draw a perpendicular segment from the chord to the center of our circle, cutting the triangle in half and
forming two right triangles. There are a few things to note by doing this.

- The hypotenuse of each right triangles is the radius of the circle, in this case one since it's a unit circle.
- The opposite side of each right triangles relative to the angle of interest is exactly half the chord.
- The angle of interest is exactly half of ${tex`\theta`}.


```js
{
    const div = html`<div style="width: 400px; height: 400px;">`;

    const board = JXG.JSXGraph.initBoard(div, {
        boundingbox: [-1.4, 1.4, 1.4, -1.4], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });

    const center = board.create("point", [0, 0], {name: "", fixed: true, size: 2});
    const circle = board.create("circle", [center, 1.0], {strokeColor: "gray", strokeOpacity: 0.4});
    const p0 = board.create("point", [1.0, 0], {name: "", fixed: true, size: 2});
    const p1 = board.create("glider", [Math.cos(Math.PI / 3) * 1.0, Math.sin(Math.PI / 3) * 1.0, circle],
        {name: "", size: 4, color: "steelblue"});

    board.create("segment", [center, p0], {
        strokeColor: "gray", 
        strokeOpacity: 0.4, 
        name: "r = 1", 
        withLabel: true,
        label: {
            strokeColor: "steelblue",
            offset: [0, -10] 
        }
    });
    board.create("segment", [center, p1], {strokeColor: "gray", strokeOpacity: 0.4});
    board.create("segment", [p0, p1], {
        strokeColor: "steelblue", 
        strokeWidth: 2,
        name: ""
    });

    const mid = board.create("midpoint", [p0, p1], {name: "", size: 2, color: "orange"})

    board.create("segment", [center, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: "",
        dash: 2
    });

    const angle = board.create("angle", [p0, center, mid], {
        radius: 0.2, 
        name: "θ/2"
    });

    board.create("segment", [p0, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: "",
        dash: 2
    });

    display(div);
}
```

Let's remember how sine and cosine are usually defined.


```tex
\sin(x)=\frac{\text{opposite}}{\text{hypotenuse}}
```
```tex
\cos(x)=\frac{\text{adjacent}}{\text{hypotenuse}}
```

Looking at our two right triangles, whose hypotenuse is the radius of the circle, we can simplify this to


```tex
\sin(x)=\frac{\text{opposite}}{1}=\text{opposite}
```
```tex
\cos(x)=\frac{\text{adjacent}}{1}=\text{adjacent}
```

As the opposite side is half the length of the chord, this leads to the equality

```tex
\text{crd}(\theta)=2\sin(\frac{\theta}{2})
```
The sine being a half-chord was its original definition, given by the Indian mathematician Aryabhata. The name "sine" being unrelated to "half-chord" comes from a translation error by medieval scholars. Indian texts were first translated into Arabic. "jya-ardha", the term used for half-chord, got shortened to "jya", and then translated phonetically by Arabic scholars as "jiba", a word with no meaning by itself in Arabic. It was later misinterpreted as "jaib", an Arabic word meaning "bay" or "fold". When it finally got translated into Latin, it was translated as sinus, the closest translation to this misinterpretation.

```js
{
    const div = html`<div style="width: 400px; height: 400px;">`;

    const board = JXG.JSXGraph.initBoard(div, {
        boundingbox: [-1.4, 1.4, 1.4, -1.4], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });

    const center = board.create("point", [0, 0], {name: "", fixed: true, size: 2});
    const circle = board.create("circle", [center, 1.0], {strokeColor: "gray", strokeOpacity: 0.4});
    const p0 = board.create("point", [1.0, 0], {name: "", fixed: true, size: 2});
    const p1 = board.create("glider", [Math.cos(Math.PI / 3) * 1.0, Math.sin(Math.PI / 3) * 1.0, circle],
        {name: "", size: 4, color: "steelblue"});

    board.create("segment", [center, p0], {
        strokeColor: "gray", 
        strokeOpacity: 0.4, 
        name: "r = 1", 
        withLabel: true,
        label: {
            strokeColor: "steelblue",
            offset: [0, -10] 
        }
    });
    board.create("segment", [center, p1], {strokeColor: "gray", strokeOpacity: 0.4});
    board.create("segment", [p0, p1], {
        strokeColor: "steelblue", 
        strokeWidth: 2,
        name: ""
    });

    const mid = board.create("midpoint", [p0, p1], {name: "", size: 2, color: "orange"})

    board.create("segment", [center, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: "",
        dash: 2
    });

    const angle = board.create("angle", [p0, center, mid], {
        radius: 0.2, 
        name: "θ/2"
    });

    board.create("segment", [p0, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `sin(θ/2) = ${Math.round((Math.sin(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            autoPosition: true,
            distance: 20,
            strokeColor: "steelblue", 
        }
    });

    display(div);
}
```

To Be Continued