<template>
  <a href="#" class="menu-item">
    <span class="icon-button"><slot name="leftIcon"></slot></span>
    <slot></slot>
    <span class="icon-right"><slot name="rightIcon"></slot></span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
});
</script>

<style lang="scss" scoped>
.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  transition: background var(--speed);
  padding: 0.5rem;

    &:hover {
      background-color: #525357;

        .icon-right {
          transform: translateX(4px);
        }
    }
}

.icon-button {
  --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: #484a4d;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

    &:hover {
      filter: brightness(1.2);
    }

    svg  {
      fill: var(--text);
      width: 20px;
      height: 20px;
    }
}

.icon-right {
  --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);

  margin-left: auto;
  transition: transform 300ms;
}
</style>'