<template>
  <div>
    <div id="item-group">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMenu',
});
</script>

<style lang="scss" scoped>

.line {
  height: 4px;
  width: 30px;
  background: #ffffff;
  margin: 5px auto;
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#item-group {
  cursor: pointer;
  
  &:hover, 
  &:focus {
    .line:nth-child(1) {
      transform: rotate(45deg) translate(12px, 12px);
    }
    .line:nth-child(2) {
      visibility: hidden;
    }
    .line:nth-child(3) {
      transform: rotate(-45deg) translate(15px, -16px);
    }
  }
}
</style>
