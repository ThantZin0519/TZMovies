<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <img src="../../../public/TZ.svg" alt="Loading Spinner" class="svg-image">
  </div>
  <!-- circle progress start  -->
  <!-- <div>
    hello circular/
  </div> -->
  <!-- circle progress end  -->
</template>

<script>
export default {
  name: 'LoadingComp',
  data() {
    return {};
  },
  mounted() {
  }
};
</script>

<style scoped>
.loading-container {
  /* position: relative; */
  width: 200px;
  /* Adjust the size of the container */
  height: 200px;
  /* Adjust the size of the container */
}

.svg-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  /* Adjust the size of the SVG */
  height: 100px;
  /* Adjust the size of the SVG */
}

.spinner {
  position: absolute;
  border: 2px solid #3498db;
  /* Color of the spinning circle */
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 120px;
  /* Diameter of the spinner */
  height: 120px;
  /* Diameter of the spinner */
  animation: spin 1.5s linear infinite;
  top: 50%;
  left: 50%;
  transform-origin: center;
  margin-top: -60px;
  /* Half of the height */
  margin-left: -60px;
  /* Half of the width */
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
/* circle progress start  */
/* circle progress end  */
</style>
