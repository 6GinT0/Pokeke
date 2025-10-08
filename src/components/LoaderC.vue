<template>
  <div class="flex-wrapper">
    <div class="pokeball"></div>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  justify-content: center;
  align-items: center; /* centra verticalmente dentro del contenedor padre */
  width: 100%;
  height: 100%; /* ocupa la altura total del contenedor padre */
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 3px solid;
  animation: frames 0.8s linear infinite;
}

.pokeball:after {
  content: '';
  position: absolute;
  width: 60px;
  height: 30px;
  background-color: red;
  border-bottom: 4px solid;
  top: -4px;
}

.pokeball:before {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 10px;
  height: 10px;
  border: 4px solid;
  border-radius: 50%;
  bottom: 18px;
  right: 18px;
  z-index: 1;
}

@keyframes frames {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
