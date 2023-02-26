<template>
  <div id="noise-filter"></div>
  <router-view />
</template>

<style lang="scss" scoped>
#noise-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  pointer-events: none;

  background:
    url(https://grainy-gradients.vercel.app/noise.svg);

  mix-blend-mode: multiply;
}
</style>
