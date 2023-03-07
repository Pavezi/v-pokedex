<template>
  <div class="loader-container" v-if="isLoading">
    <div class="loader">
        <div class="pokebutton"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isLoading: Boolean,
  },
};
</script>

<style scoped>
.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
    border: 25px solid #000;
    border-radius: 50%;
    background: #fff;
    width: 400px;
    height: 400px;
    overflow: hidden;
    animation: spin-61991b80 1s linear infinite;
}
.loader::before,
.loader::after{
    content: '';
    position: absolute;
    transform: translate( -50%);
}
.loader::before{
    background: red;
    width: 100%;
    height: 50%;
}
.loader::after{
    top: calc(50% - 15px);
    width: 100%;
    height: 25px;
    background: #000;
}

.pokebutton{
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    background: #7f8c8d;
    border: 20px solid #fff;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 20px #000;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
