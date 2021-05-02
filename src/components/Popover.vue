<template>
  <div class="popover" v-if="visible">
    <div>
      <p>Porter Robinson & Totally Enormous Extinct Dinosaurs</p>
      <p>Unfold (Official Audio)</p>
      <p>(Official Audio)</p>
      <p>Porter Robinson</p>
      <p>Totally Enormous Extinct Dinosaurs</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popover",
  emits: ['changedVisibility'],

  props: {
    visible: { type: Boolean, required: true }
  }

};
</script>

<style lang="scss" scoped>
.popover {
  background-color: var(--bg);
  padding: 15px;
  border-radius:  6px;

  position: absolute;
  left: calc(100% + 10px);
  top: -65px;

    &::before {
      content: "";
      background-color: var(--bg);
      height: 20px;
      width: 20px;
      position: absolute;
      left: -10px;
      top: calc(50% - 10px);
      transform: rotate(45deg);
    }

    >div {
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 500px;
      width: 250px;

        p {
          padding: 4px 0px;
        }
    }
}
</style>