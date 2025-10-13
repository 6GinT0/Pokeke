<template>
  <div class="pokeball">
    <div class="pokeball__button"></div>
  </div>
</template>

<style scoped>
.pokeball {
  position: relative;
  width: 100px;
  height: 100px;
  background: #fff;
  border: 5px solid #000;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -10px 10px 0 10px #ccc;
}

.pokeball::before,
.pokeball::after {
  content: '';
  position: absolute;
}

.pokeball::before {
  background: red;
  width: 100%;
  height: 50%;
}

.pokeball::after {
  top: calc(50% - 5px);
  width: 100%;
  height: 10px;
  background: #000;
}

.pokeball__button {
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  width: 20px;
  height: 20px;
  background: #fff;
  border: 4px solid #7f8c8d;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 7px black;
  animation: blink 0.5s alternate infinite;
  animation-play-state: paused;
}
</style>
