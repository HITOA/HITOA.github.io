---
title: Derivative
toc: true
---

[Disclaimer](/disclaimer)

# Derivative

This is WIP

---

Let's learn a new way to measure a rate of change. It's one of the most useful tools in calculus, and will be used plenty in digital signal processing, especially in physical modelling synthesis.

## Average Rate of Change

Let's imagine a 1-dimensional object, whose position ${tex`x`} through time ${tex`t`} is defined as ${tex`x(t) = t²`}. We can imagine this object's position on a line and try to visualise it as ${tex`t`} changes. Simply by reading the function, we have a good idea that the position ${tex`x`} of said object is increasing over time. At ${tex`t=0`} the position of the object is ${tex`t²=0`}, at ${tex`t=1`} its position is ${tex`t²=1`}, at ${tex`t=2`} its position is ${tex`4`}, and so on.

We could then ask the question:
```tex
\text{By how much}\; x\; \text{ is changing over some time}\; \Delta{t}\;\text{?}
```
We can answer that by taking the difference between the point at ${tex`x(t + \Delta t)`} and the point at ${tex`x(t)`}
```tex
x(t + \Delta t) - x(t)
```
That was easy! Asking this question results in the answer being a signed distance. This is nice, but maybe something a bit more useful would be to ask about its speed or velocity. Velocity is a ratio between distance and time, such as meters per second, kilometers per hour... When we ask about the velocity of an object, it is the same as asking

```tex
\text{By how much}\; x\;\text{ is changing per unit of time ?}
```
Adjusting our formula to take this into account isn't much work. All we have to do is divide our distance by the change in time our distance was calculated over.
```tex
\frac{x(t + \Delta t) - x(t)}{\Delta t}
```
This effectively gives us the velocity, the ratio between distance and time, which can also be called rate of change.

> a rate is a ratio between two different units, in this case the change which is the distance in meters, kilometers, miles, or whatever, and the time which is in seconds, hours, days...

But we don't live in discrete space! At least as far as I'm aware... The bigger ${tex`\Delta t`} is, the more of an approximation this becomes, we are potentially losing information. For example, perhaps we were twice as fast over the second half of ${tex`\Delta t`} than over the first half? Maybe we don't care, but sometimes we do, and we need to explore a way to solve this issue. Also, I'm sure the police won't care if only your ***average*** speed was below the speed limit.

---

## Instantaneous Rate of Change

The way we approached the problem was with an average rate of change. But to solve our issue, we can perhaps try to find the instantaneous rate of change. This is what a derivative is; let's go one step at a time to try and understand it.

An intuitive way to be more precise with our average rate of change could be simply to put smaller and smaller values of ${tex`\Delta t`} to get a more and more precise result. But we can't simply put ${tex`\Delta t = 0`} as it would mean dividing by zero, which is undefined. Fortunately, there is a tool we can use to represent this. It's called a limit; let's first see what the notation looks like, and then understand what it means exactly.
```tex
\lim_{x\to a}f(x)
```
The limit defines a few things here. We have ${tex`x`} and ${tex`a`}, which can be read as ${tex`x`} approaching ${tex`a`}. The whole expression is usually defined as ${tex`L`}. Let's get a more concrete example with our previous formula
```tex
\lim_{dt\to0}\frac{x(t + dt) - x(t)}{dt}
```
Naming the approaching value with a ${tex`d`} is the standard notation; in our case it simply replaces ${tex`\Delta t`}. This can be read as ${tex`dt`} approaching ${tex`0`}, which is exactly what we want. As ${tex`dt`} gets closer and closer to ${tex`0`}, our rate of change gets more and more precise. The whole expression, as mentioned, is ${tex`L`} as well. The limit is defined such that for every ${tex`\epsilon > 0`} there exists a ${tex`\delta > 0`} such that for all ${tex`x`}, if
```tex
0 < |x - a| < \delta
```
then
```tex
|f(x) - L| < \epsilon
```
It can be a bit hard to understand. In a nutshell this means that every small enough nudge in the input results in a small enough nudge at the output. It also means that ${tex`x`} cannot be ${tex`a`}. Or in our case, ${tex`dt`} cannot be ${tex`0`}. We are not gonna cover it further as only an intuitive understanding is enough for us. If you want proof and a better explanation of limits, see the [epsilon-delta definition of limits](https://brilliant.org/wiki/epsilon-delta-definition-of-a-limit/). For us, all we have to understand is that, in our case, ${tex`dt`} is approaching ${tex`0`} but never reaches it, which is exactly what we want. But we will see how to substitute it for ${tex`dt=0`} using the property of continuous functions.

With our earlier expression, we couldn't substitute ${tex`\Delta t`} for ${tex`0`} because we would have been dividing by zero, which is undefined. Our earlier expression is discontinuous in that sense. Fortunately for us, it is only discontinuous at ${tex`0`} and the way to solve it is with limits.
First, let's give a name for our full new expression, including the limit. Because we are differentiating the function ${tex`x(t)`}, the standard notation is to prime the function such that the derivative of ${tex`x(t)`} is ${tex`x'(t)`}. We will talk about derivative order later on, but for now simply remember that a prime at a function's name simply means the derivative of that function. Let's then define our function with our expression.

```tex
x'(t) = \lim_{dt\to0}\frac{x(t + dt) - x(t)}{dt}
```

The definition of a limit tells us that ${tex`dt`} can never be ${tex`0`}. So we can try and simplify this function with peace of mind knowing we are not gonna divide by zero. Let's do that.
```tex
\begin{aligned}
x'(t) &= \lim_{dt\to0}\frac{x(t + dt) - x(t)}{dt} \\
&=\lim_{dt\to0}\frac{(t + dt)² - t²}{dt} \\
&=\lim_{dt\to0}\frac{t² + t\cdot dt + dt \cdot t + dt²-t²}{dt} \\
&=\lim_{dt\to0}\frac{t\cdot dt + dt \cdot t + dt²}{dt} \\
&=\lim_{dt\to0}2t + dt
\end{aligned}
```
We have simplified our expression down to a simple polynomial, which is really important, as polynomials are continuous everywhere by definition. That means we can simply substitute ${tex`dt`} for ${tex`0`} now. But hold on, there is a problem: doesn't the definition of a limit itself prevent us from doing that? Well yeah, but there is a catch. There is a really important equality that defines continuity itself using limits.
```tex
\lim_{x\to a}f(x) = f(a)
```
A way to understand it intuitively is to think about a limit as evaluating the neighbourhood of ${tex`a`}. Even though ${tex`x`} is never equal to ${tex`a`}, it is as close as possible to it. If ${tex`f(x)`} weren't equal to ${tex`f(a)`}, that would mean there is a gap, jump, or hole at ${tex`a`}, which wouldn't make the function continuous. But this is good news for us. Knowing that every polynomials are continuous, we can reframe the equality above with our expression, this means that we can substitute
```tex
\lim_{dt\to 0}2t + dt = 2t + 0
```
Which, once simplified, would mean
```tex
x'(t) = 2t
```
And there we have it, a simplified beautiful function, as precise as it can get, to calculate the instantaneous velocity of our object.

---

# The Order

Why stop here? Now that we know how to get the derivative of a function, we could take the derivative of the velocity itself, right? Because a derivative is a rate of change, in our case, it would be the change in speed per unit time, which is the acceleration. Taking the derivative of a derivative is called the second-order derivative; the first-order derivative is our velocity function. You can take any order of derivative; its notation will be the nth prime on the function's name for an nth-order derivative. So for our acceleration this would mean
```tex
x''(t) = \lim_{dt\to0}\frac{x'(t + dt) - x'(t)}{dt}
```
Solving it the way we did earlier would give us

```tex
\begin{aligned}
x''(t) &= \lim_{dt\to0}\frac{x'(t + dt) - x'(t)}{dt} \\
&=\lim_{dt\to0}\frac{2(t + dt) - 2t}{dt} \\
&=\lim_{dt\to0}\frac{2t + 2dt - 2t}{dt} \\
&=\lim_{dt\to0}\frac{2dt}{dt} \\ \\
&=2 \\
\end{aligned}
```
This is a constant, so the acceleration of our object at any time is ${tex`2`}. It's important to be able to understand what a derivative represents, in this case the acceleration, as it can often be used instead of a more common name depending on the context, for example in differential equations.