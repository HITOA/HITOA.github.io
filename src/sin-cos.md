---
title: Sine and Cosine
---

[Disclaimer](/disclaimer)

# Sine and Cosine

---

I want to write a quick refresher about ${tex`\sin(\theta)`} and ${tex`\cos(\theta)`}. Two really important functions regarding digital signal processing (among many others), and they will even help us, when the time comes, to understand complex number multiplication, exponentiation, and much more.

Before we can explore these concepts, let's first understand what sine and cosine represent. We are going to see how trigonometry emerge from a circle instead of a triangle, since this is the definition that survives generalization and will be most useful to us in the future.
We will also see how ${tex`\sin(\theta)`} and ${tex`\cos(\theta)`} aren't simply two separate ratio, but can be interpreted as coordinate as well.

The origin of sine, cosine, and other trigonometric functions seems to be tied to astronomy and calculating distances.  
Greek astronomers and mathematicians (most notably Hipparchus and Ptolemy) used a segment joining two points on a circle, called a chord to define the first form of trigonometric functions.  
Ptolemy used a circle with a diameter of 120 units. Given an angle ${tex`\theta`}, as it goes from
${tex`0`} to ${tex`\pi`} radians, the chord of an arc of ${tex`\theta`} goes from 0 to 120 (the diameter of the circle).

```js
import * as JXG from "jsxgraph";
```

<div id="jsxgraph1" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = JXG.JSXGraph.initBoard("jsxgraph1", {
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

<div id="jsxgraph2" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = JXG.JSXGraph.initBoard("jsxgraph2", {
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

    board.create("segment", [p1, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: "",
        dash: 2
    });
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

<div id="jsxgraph3" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = JXG.JSXGraph.initBoard("jsxgraph3", {
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

    const angle = board.create("angle", [p0, center, mid], {
        radius: 0.2, 
        name: "θ/2"
    });

    board.create("segment", [center, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `cos(θ/2) = ${Math.round((Math.cos(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            autoPosition: true,
            distance: 10,
            strokeColor: "steelblue"
        }
    });

    board.create("segment", [p1, mid], {
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
}
```

Now that we have recovered sine and cosine from the geometry of a circle, let's try shifting our perspective a little.
Right now, one of the radius of the isosceles triangle formed by the two radii and the chord is fixed in place, from the center,
to the circumference of the unit circle. Instead let's allow it to move in a way that instead keep the bisecting segment fixed on
the horizontal axis, and the chord fixed on the vertical axis. Let's also considere theta as being half of the angle of the arc of
the chord for convenience of notation while working with sin, changing the earlier equality to

```tex
\text{crd}(2\theta)=2\sin(\theta)
```
Let's also name one of the point at the end of the chord ${tex`p_1`} for future reference.

<div id="jsxgraph4" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = JXG.JSXGraph.initBoard("jsxgraph4", {
        boundingbox: [-1.4, 1.4, 1.4, -1.4], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });

    const center = board.create("point", [0, 0], {name: "", fixed: true, size: 2});
    const circle = board.create("circle", [center, 1.0], {strokeColor: "gray", strokeOpacity: 0.4});
    const p0 = board.create("glider", [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), circle], {
        name: "p1", 
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });
    const p1 = board.create("point", [() => p0.X(), () => -p0.Y()], {name: "", fixed: true, size: 2});


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
    board.create("segment", [p0, p1], {strokeColor: "gray", strokeOpacity: 0.4});


    const p2 = board.create("point", [1.0, 0.0], {name: "", fixed: true, size: 0});

    board.create("segment", [center, p2], {strokeColor: "gray", strokeOpacity: 0.4});


    const mid = board.create("midpoint", [p0, p1], {name: "", size: 2, color: "orange"})

    const angle = board.create("angle", [p2, center, p0], {
        radius: 0.2, 
        name: "θ"
    });

    board.create("segment", [center, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `cos(θ) = ${Math.round((Math.cos(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            distance: 10,
            strokeColor: "steelblue"
        }
    });

    board.create("segment", [p0, mid], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `sin(θ) = ${Math.round((Math.sin(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            distance: 20,
            strokeColor: "steelblue", 
        }
    });
}
```

This is still the same right triangle. The hypotenuse is still the radius of the circle, the opposite side is still half of the chord,
and the adjacent side is still the segment bisecting the chord perpendicularly from the center. 
But now something emerge from this point of view, we can see that the coordinate of the point ${tex`p_1`} is simply ${tex`(\cos(\theta), \sin(\theta))`}. This is true for any point on the unit circle. But what about a point outside the unit circle ?
Let's imagine a point that has for coordinates ${tex`(2.0, 0.0)`}. It's obvious this point doesn't live on the unit circle, but it does live on a circle centered at the origin with a radius 2.0. In fact any point in a plane lies on a circle centered at the origin, whose radius is the distance from the origin to the point. We can calculate said distance with the Pythagorean theorem.
```tex
r = \sqrt{x²+y²}
```
Generalizing coordinates using ${tex`\sin(\theta)`} and ${tex`\cos(\theta)`} is then simply a matter of scaling by ${tex`r`}.

<div id="jsxgraph5" style="width: 600px; height: 600px;"></div>

```js
{

    const board = JXG.JSXGraph.initBoard('jsxgraph5', {
        boundingbox: [-5.0, 5.0, 5.0, -5.0], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });
    board.resizeContainer(600, 600, false, false);

    const center = board.create("point", [0, 0], {name: "", fixed: true, size: 2});

    const p0 = board.create("point", [2.0, 2.0], {
        name: "p1", 
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });

    const p1 = board.create("point", [() => p0.X(), 0.0], {
        name: "", 
        size: 2
    });

    const p2 = board.create("point", [1.0, 0.0], {name: "", fixed: true, size: 0});


    const angle = board.create("angle", [p2, center, p0], {
        radius: 0.5, 
        name: "θ"
    });

    board.create("segment", [center, p1], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `r cos(θ) = ${Math.round((Math.sqrt(p0.X() * p0.X() + p0.Y() * p0.Y()) * Math.cos(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            distance: 10,
            strokeColor: "steelblue"
        }
    });

    board.create("segment", [p1, p0], {
        strokeColor: "orange", 
        strokeWidth: 2,
        name: () => `r sin(θ) = ${Math.round((Math.sqrt(p0.X() * p0.X() + p0.Y() * p0.Y()) * Math.sin(angle.Value()) + Number.EPSILON) * 100) / 100}`,
        dash: 2,
        withLabel: true,
        label: {
            distance: 20,
            strokeColor: "steelblue", 
        }
    });

    board.create("segment", [center, p0], {
        strokeColor: "steelblue", 
        strokeWidth: 2,
        name: () => `r = sqrt(x²+y²) = ${Math.round((Math.sqrt(p0.X() * p0.X() + p0.Y() * p0.Y()) + Number.EPSILON) * 100) / 100}`,
        withLabel: true,
        label: {
            autoPosition: true,
            distance: 10,
            strokeColor: "steelblue", 
        }
    });

    const circle = board.create("circle", [center, () => Math.sqrt(p0.X() * p0.X() + p0.Y() * p0.Y())], {strokeColor: "gray", strokeOpacity: 0.4});
}
```

Congratz! We just rediscovered polar coordinates. We can now define a point by its radius and by its angle giving ${tex`(r,\theta)`}. We also have almost everything we need to convert from Carthesian coordinates to polar coordinates and vice versa. The only thing missing is getting the angle from Carthesian coordinates, which is the atan2 of both axes. Giving us

```tex
x = r\cos(\theta)
```
```tex
y = r\sin(\theta)
```
and
```tex
r = \sqrt{x²+y²}
```
```tex
\theta = \text{atan2}(y, x)
```
This will be immensely useful to understand and build an intuition about complex number multiplication and exponentiation which we will explore in the next chapter.