<template>
  <svg class="pl" viewBox="0 0 64 64" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#a80df1" />
        <stop offset="100%" stop-color="#fff" />
      </linearGradient>
      <mask id="grad-mask">
        <rect x="0" y="0" width="64" height="64" fill="url(#grad)" />
      </mask>
    </defs>
    <circle
      class="pl__ring"
      cx="32"
      cy="32"
      r="26"
      fill="none"
      stroke="hsl(231, 90%, 50%)"
      stroke-width="12"
      stroke-dasharray="169.65 169.65"
      stroke-dashoffset="-127.24"
      stroke-linecap="round"
      transform="rotate(135)"
    />
    <g fill="hsl(223,90%,55%)">
      <circle class="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
      <circle class="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
    </g>
    <g mask="url(#grad-mask)">
      <circle
        class="pl__ring"
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="hsl(281,90%,50%)"
        stroke-width="12"
        stroke-dasharray="169.65 169.65"
        stroke-dashoffset="-127.24"
        stroke-linecap="round"
        transform="rotate(135)"
      />
      <g fill="hsl(283,90%,55%)">
        <circle class="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
        <circle class="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
      </g>
    </g>
  </svg>
</template>

<style scoped lang="scss">
* {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --hue: 223;
  --bg: hsl(var(--hue), 10%, 90%);
  --fg: hsl(var(--hue), 10%, 10%);
  --trans-dur: 0.3s;
  font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320));
}
body {
  background: var(--bg);
  color: var(--fg);
  font: 1em/1.5 sans-serif;
  height: 100vh;
  display: grid;
  place-items: center;
  transition:
    background-color var(--trans-dur),
    color var(--trans-dur);
}

.pl {
  display: block;
  width: 8em;
  height: 8em;
}
.pl__ring,
.pl__ball1,
.pl__ball2 {
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transform-origin: 32px 32px;
}
.pl__ring {
  animation-name: ring;
}
.pl__ball1 {
  animation-name: ball1;
}
.pl__ball2 {
  animation-name: ball2;
}

/* Dark theme  */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: hsl(var(--hue), 10%, 10%);
    --fg: hsl(var(--hue), 10%, 90%);
  }
}

/* Animation */
@keyframes ring {
  from {
    animation-timing-function: ease-in-out;
    stroke-dashoffset: -122.52;
    transform: rotate(135deg);
  }
  15% {
    animation-timing-function: ease-in;
    stroke-dashoffset: -122.52;
    transform: rotate(90deg);
  }
  35% {
    animation-timing-function: ease-out;
    stroke-dashoffset: -65.34;
    transform: rotate(297.5deg);
  }
  55% {
    animation-timing-function: ease-in-out;
    stroke-dashoffset: -122.52;
    transform: rotate(505deg);
  }
  70% {
    animation-timing-function: ease-in-out;
    stroke-dashoffset: -122.52;
    transform: rotate(490deg);
  }
  85%,
  to {
    stroke-dashoffset: -122.52;
    transform: rotate(497.5deg);
  }
}
@keyframes ball1 {
  from {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-7deg);
  }
  60% {
    transform: rotate(399deg);
  }
  75% {
    transform: rotate(361deg);
  }
  90%,
  to {
    transform: rotate(374deg);
  }
}
@keyframes ball2 {
  from {
    transform: rotate(-21deg);
  }
  25% {
    transform: rotate(-47deg);
  }
  60% {
    transform: rotate(364deg);
  }
  75% {
    transform: rotate(326deg);
  }
  90%,
  to {
    transform: rotate(339deg);
  }
}
</style>
