<template>
  <div class="father">
    <div class="son">这是一段文字</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scope>
.father {
  width: 400px;
  height: 400px;
  background-color: royalblue;
  position: absolute;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .son {
    // width: 100px;
    // height: 100px;
    background-color: pink;
    position: relative;
    left: 50%;
    top: 50%;
  }
}
</style>