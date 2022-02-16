<template>
<div class="backdrop">
  <div class="loader"> 
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
   </div>
</div>
</template>

<script>
export default {
  
}
</script>

<style>
:root {
  --min-size: 2px;
  --max-size: 16px;
}
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  background: white;
  margin: 5px;
  animation-name: loader;
  animation-duration: .4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.dot:nth-child(1) {
  animation-delay: .1s;
}
.dot:nth-child(2) {
  animation-delay: .2s;
}
.dot:nth-child(3) {
  animation-delay: .3s;
}
.dot:nth-child(4) {
  animation-delay: .4s;
}
.dot:nth-child(5) {
  animation-delay: .5s;
}

@keyframes loader {
  from {
    width: var(--min-size);
    height: var(--min-size);
    border-radius: calc(var(--min-size) / 2);
  }
  to {
    width: var(--max-size);
    height: var(--max-size);
    border-radius: calc(var(--max-size) / 2);
  }
}
</style>