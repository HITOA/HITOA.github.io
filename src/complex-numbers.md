---
title: Complex Numbers
toc: true
---

```js
import { complexPlane, complexPoint } from "./components/complex.js";
```

[Disclaimer](/disclaimer)

# Complex Numbers

---

Let's learn what complex numbers are, and how to work with them. This chapter will involve things seen in the [Sine and Cosine](/sin-cos) chapter.

## Complex and Imaginary

Complex numbers were first invented by italian mathematicians such as Cardano and Bombelli as a tool to solve cubic equation when they encountered square root of a negative number. Today, it is useful in many fields, including digital signal processing, as it is extremely useful to work with math involving rotation, electrical circuit analysis, and much more.

Let's first define imaginary number and the imaginary unit. The imaginary unit is usually noted ${tex`i`} or, in some cases ${tex`j`}. We will use the notation ${tex`i`}. It is defined as
```tex
i = \sqrt{-1}
``` 
> *Note that the notation ${tex`j`} is mainly used in electrical engineering to avoid the confusion between current ${tex`i`} and the imaginary unit.*

Any imaginary number is the product of a real number and the imaginary unit such as ${tex`bi`} for ${tex`b \in \R`}.

This leads to complex numbers, commonly denoted as ${tex`z`} and ${tex`w`}, which are numbers composed of a real part and an imaginary part. It is usually expressed as
```tex
z = a+bi
``` 
with ${tex`a`} being the real part, and ${tex`bi`} the imaginary part. A complex number whose real part is 0 is called purely imaginary, as well as purely real if its imaginary part is 0.

A really useful way for us to represent complex number is with geometry. The same way we can represent all the real number or imaginary number individually on one axis, we can represent complex number on a plane, that has for horizontal axis all the real number, and for vertical axis all the imaginary number. We can then plot any complex number ${tex`a+bi`} as a point whose coordinate are ${tex`(a, b)`}.


<div id="jsxgraph1" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = complexPlane("jsxgraph1", { width: 5.0, height: 5.0 });
    
    const z = complexPoint(board, { x: 2.0, y: 2.0 });
}
```
This is called the complex plane, and will help us visualize what happen and help us build an intuition when doing complex numbers operation. Note that this way of expressing complex numbers is called the rectangular form. We will talk about the polar form of a complex numbers whose representation is a little bit different later in this chapter when talking about multiplication.

Let's first see what happens when we add and subtract complex number. Let's consider two complex numbers ${tex`z=a+bi`} and ${tex`w=c+di`}. Addition is defined as independently summing their real part and their imaginary part. subtraction is defined in a similar fashion as well:
```tex
z+w = (a+bi)+(c+di) = (a+c)+i(b+d)
```
```tex
z-w = (a+bi)-(c+di) = (a-c)+i(b-d)
```
This can be interpreted as translation on the complex plane. Let's draw some arrows to visualize it better.

<div id="jsxgraph2" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = complexPlane("jsxgraph2", { width: 5.0, height: 5.0 });
    
    const z = board.create("point", [2.0, 2.0], {
        name: "z", 
        showInfobox: false,
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });

    const w = board.create("point", [1.0, -1.0], {
        name: "w", 
        showInfobox: false,
        size: 4, 
        color: "orange",
        label: {
            strokeColor: "orange"
        }
    });

    const zpw = board.create("point", [() => z.X() + w.X(), () => z.Y() + w.Y()], {
        name: "", 
        showInfobox: false,
        size: 2,
        fixed: true,
        color: "gray"
    });

    const zmw = board.create("point", [() => z.X() - w.X(), () => z.Y() - w.Y()], {
        name: "", 
        showInfobox: false,
        size: 2,
        fixed: true,
        color: "gray"
    });

    const wmz = board.create("point", [() => w.X() - z.X(), () => w.Y() - z.Y()], {
        name: "", 
        showInfobox: false,
        size: 2,
        fixed: true,
        color: "gray"
    });

    board.create("arrow", [[0, 0], z], {
        strokeColor: "steelblue"
    })

    board.create("arrow", [[0, 0], w], {
        strokeColor: "orange"
    })

    board.create("arrow", [z, zpw], {
        name: "z+w",
        strokeColor: "orange",
        strokeOpacity: 0.4
    })

    board.create("arrow", [w, zpw], {
        name: "w+z",
        strokeColor: "steelblue",
        strokeOpacity: 0.4
    })

    board.create("arrow", [z, zmw], {
        name: "w+z",
        strokeColor: "orange",
        strokeOpacity: 0.4
    })

    board.create("arrow", [w, wmz], {
        name: "w+z",
        strokeColor: "steelblue",
        strokeOpacity: 0.4
    })

    board.create("text", [() => z.X() + w.X() / 2.0, () => z.Y() + w.Y() / 2.0, "z+w"], {
        strokeColor: "white",
        anchorX: "middle",
        anchorY: "middle"
    })

    board.create("text", [() => z.X() / 2.0 + w.X(), () => z.Y() / 2.0 + w.Y(), "w+z"], {
        strokeColor: "white",
        anchorX: "middle",
        anchorY: "middle"
    })

    board.create("text", [() => z.X() - w.X() / 2.0, () => z.Y() - w.Y() / 2.0, "z-w"], {
        strokeColor: "white",
        anchorX: "middle",
        anchorY: "middle"
    })

    board.create("text", [() => w.X() - z.X() / 2.0, () => w.Y() - z.Y() / 2.0, "w-z"], {
        strokeColor: "white",
        anchorX: "middle",
        anchorY: "middle"
    })
}
```
Simple enough. Complex numbers also have their own special operation, called the conjugate. Conjugating a complex number is simply inversing its imaginary part. The conjugate of a complex number ${tex`z`} for ${tex`z = a+bi`} is expressed like so 
```tex
\overline{z} = \overline{a+bi} = a+(-bi)=a-bi
```
Both ${tex`z`} and its conjugate ${tex`\overline{z}`} can be solutions to a quadratic equation, as well as being useful to take the absolute value of a complex number ${tex`z\cdot\overline{z}=|z|²`}.

On the complex plane, conjugating a complex number result in reflecting its position across the horizontal axis (the real axis).

Now let's tackle multiplication. It will seem a bit weird at first as we use the rectangular form of the complex number. But as we progress, we will see a more intuitive representation of complex numbers multiplication using polar form. first, using the rectangular form, let's see what multiplying two complex numbers ${tex`z = a+bi`} and ${tex`w = c+di`} gives us.

```tex
\begin{aligned}
z \cdot w &= (a+bi)\cdot(c+di) \\
&= a \cdot c + a \cdot di + bi \cdot c + bi \cdot di \quad &\text{FOIL method} \\
&= a \cdot c + i(a \cdot d + b \cdot c) + i²(b \cdot d) \quad &\text{Pull out imaginary unit} \\
&= a \cdot c + i(a \cdot d + b \cdot c) - b \cdot d \quad &\text{Remember that}\; i=\sqrt{-1} \\
&= (a \cdot c - b \cdot d) + i(a \cdot d + b \cdot c) \quad &\text{Isolate real from imaginary}
\end{aligned}
```
It's a bit of a mess, but let's notice something important. When multiplying two imaginary number together such as ${tex`bi`} and ${tex`di`}, the result is a real number, as ${tex`i²`} simply become -1.
```tex
bi \cdot di = i²(b \cdot d) = \sqrt{-1}²(b \cdot d) = -1(b \cdot d) = -b \cdot d
```
Even if the current result of multiplying two complex numbers is a mess, it is what it is. Let's try to visualize it and see if we can build an intuition of what is happening.

<div id="jsxgraph3" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = complexPlane("jsxgraph3", { width: 5.0, height: 5.0 });
    
    const z = board.create("point", [2.0, 1.0], {
        name: "z", 
        showInfobox: false,
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });

    const w = board.create("point", [-1.0, -1.0], {
        name: "w", 
        showInfobox: false,
        size: 4, 
        color: "orange",
        label: {
            strokeColor: "orange"
        }
    });

    const zdw = board.create("point", [
        () => {
            return z.X() * w.X() - z.Y() * w.Y();
        }, 
        () => {
            return z.X() * w.Y() + z.Y() * w.X();
        }], {
        name: "", 
        showInfobox: false,
        size: 2,
        fixed: true,
        color: "gray"
    });

    board.create("arrow", [[0, 0], z], {
        strokeColor: "steelblue"
    })

    board.create("arrow", [[0, 0], w], {
        strokeColor: "orange"
    })

    board.create("arrow", [[0, 0], zdw], {
        strokeColor: "gray"
    })
}
```
That's not really helping. Now you could say it looks kind of rotate-ish, but there is clearly more than that happening. Now is a good time to introduce the polar form of the complex numbers and talk about the Euler formula.

---

## Euler Formula and Polar Form  

First, let's try to find out what happens, and what does it means to take the exponential of an imaginary number as in ${tex`\mathrm{e}^{bi}`}. Something we can do is find the derivative of ${tex`\mathrm{e}^{bi}`} and see if we can understand something by reading how it changes.
let's consider
```tex
f(x)=\mathrm{e}^{xi}
```
The derivative of ${tex`\mathrm{e}`} is itself. We can then use the chain rule to find the full derivative, ending up with
```tex
f'(x)=i\cdot\mathrm{e}^{xi}
```
Multiplying by ${tex`i`} does something special, it rotates 90° counterclockwise. We can verify that using a bit of linear algebra. First here is what multiplying by i does
```tex
\begin{aligned}
z \cdot i &= (a+bi) \cdot i \\
&= ai + bi² \\
&= ai + -b \\
&= (-b+ai)
\end{aligned}
```
Then let's try rotating ${tex`z`} using standard linear algebra and matrix multiplication. As we've seen earlier, we can represent a complex number on the complex plane with point ${tex`(a, b)`}.

```tex
R_{90°}
\begin{pmatrix}
a \\
b
\end{pmatrix}
=
\begin{pmatrix}
\cos{90°} & -\sin{90°} \\
\sin{90°} & \cos{90°} \\
\end{pmatrix}
\begin{pmatrix}
a \\
b
\end{pmatrix}
=
\begin{pmatrix}
0 & -1 \\
1 & 0 \\
\end{pmatrix}
\begin{pmatrix}
a \\
b
\end{pmatrix}
=
\begin{pmatrix}
-b \\
a
\end{pmatrix}
```
And sure enough the result lines up. What this means is that the derivative, the rate-of-change, of ${tex`f(x)=\mathrm{e}^{xi}`} is itself rotated 90°. In other word ${tex`f'(x)`} is always perpendicular to ${tex`f(x)`}. Meaning that for every value ${tex`x`} of ${tex`f(x)`}, the distance from the origin will stay the same, forming a circle. To know the radius of that circle, we can simply compute ${tex`f(x)`} for some value of ${tex`x`}. Let's take ${tex`x`} = 0
```tex
f(0)=\mathrm{e}^{0i}=1
```

We now know that any value ${tex`x`} in ${tex`f(x)`} lies on the unit circle on the complex plane. Even more convenient, it happens that the result for ${tex`\mathrm{e}^{\pi i}`} is ${tex`-1`}. Leading to the Euler identity
```tex
\mathrm{e}^{\pi i}+1=0
```
And more generally the Euler formula
```tex
\mathrm{e}^{\theta i}=\cos(\theta)+i\sin(\theta)
```
There are a few things to note here. First, note that ${tex`\cos(\theta)+i\sin(\theta)`} is a complex number of the rectangular form ${tex`a+bi`} whose coordinate are  
exactly ${tex`(\cos(\theta), \sin(\theta))`}. Those are polar coordinate with radius 1. We can generalize it to 
${tex`(r\cos(\theta), r\sin(\theta))`} with radius ${tex`r`} to account for any complex numbers on the complex plane, or directly ${tex`r\cdot\cos(\theta)+ri\cdot\sin(\theta)`} as a way to represent any complex number. Going back to the euler formula, this mean we can express any complex numbers as
```tex
r\cdot\mathrm{e}^{\theta i}
```
This is the polar form of a complex number. This can seem a bit daunting, or you might even wonder why representing a complex number like this in the first place, but this will make a lot more sense by going back to the multiplication operation.

Let's consider two complex numbers ${tex`z`} and ${tex`w`} in their polar form with
```tex
z=r_1\cdot\mathrm{e}^{\theta_1i} \quad \text{and} \quad w=r_2\cdot\mathrm{e}^{\theta_2i}
```
Now if we try to multiply them together, this will be a lot simpler:
```tex
\begin{aligned}
z \cdot w &= r_1\cdot\mathrm{e}^{\theta_1i} \cdot r_2\cdot\mathrm{e}^{\theta_2i} \\
&= r_1 r_2 \cdot \mathrm{e}^{\theta_1i}\mathrm{e}^{\theta_2i} \quad &\text{Regroup exponantial together} \\
&= r_1 r_2 \cdot \mathrm{e}^{\theta_1i+\theta_2i} \quad &\text{Exponantials turn sum into product} \\
&= r_1 r_2 \cdot \mathrm{e}^{i(\theta_1+\theta_2)} \quad &\text{Pull out imaginary unit}
\end{aligned}
```
This is way easier to understand intuitivelly. what is happening here is that multiplying two complex numbers together result in multiplying their radius and summing their angle.


<div id="jsxgraph4" style="width: 400px; height: 400px; margin-left: 100px;"></div>

```js
{
    const board = complexPlane("jsxgraph4", { width: 5.0, height: 5.0 });
    
    const z = board.create("point", [2.0, 1.0], {
        name: "z", 
        showInfobox: false,
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });

    const w = board.create("point", [-1.0, -1.0], {
        name: "w", 
        showInfobox: false,
        size: 4, 
        color: "orange",
        label: {
            strokeColor: "orange"
        }
    });

    const zdw = board.create("point", [
        () => {
            return z.X() * w.X() - z.Y() * w.Y();
        }, 
        () => {
            return z.X() * w.Y() + z.Y() * w.X();
        }], {
        name: "", 
        showInfobox: false,
        size: 2,
        fixed: true,
        color: "gray"
    });

    board.create("arrow", [[0, 0], z], {
        strokeColor: "steelblue"
    })

    board.create("arrow", [[0, 0], w], {
        strokeColor: "orange"
    })

    board.create("arrow", [[0, 0], zdw], {
        strokeColor: "gray"
    })
}
```
To Be Continued