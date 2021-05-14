<template>
  <div>
    <div id="item-group">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div id="dropdown">
      <div id="menu">
        <DropdownItem>
          <template v-slot:leftIcon><OptionsIcon/></template> 
          Queue
          <template v-slot:rightIcon><ChevronIcon/></template> 
        </DropdownItem>
        <DropdownItem>
          <template v-slot:leftIcon><OptionsIcon/></template> 
          History
          <template v-slot:rightIcon><ChevronIcon/></template> 
        </DropdownItem>
        <DropdownItem>
          <template v-slot:leftIcon><OptionsIcon/></template> 
          Settings
          <template v-slot:rightIcon><ChevronIcon/></template> 
        </DropdownItem>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DropdownItem from './DropdownItem.vue'

//icons
import ChevronIcon from '@/assets/icons/chevron-forward.svg'
import OptionsIcon from '@/assets/icons/settings.svg'

export default defineComponent({
  name: 'AppMenu',
  components: { DropdownItem, ChevronIcon, OptionsIcon },
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
  display: none;

  &:hover, 
  &:focus {
    .line:nth-child(1) {
      transform: rotate(45deg) translate(6px, 7px);
    }
    .line:nth-child(2) {
      visibility: hidden;
    }
    .line:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -7px);
    }
  }
}

/* Dropdown Menu */
#dropdown {
  width: 300px;
  max-height: 50vh;
  transform: translateX(-45%);
  background-color: var(--bg);
  border: 1px rgba(var(--border), 0.3) solid;
  border-radius: var(--border-radius);
  padding: 1rem;
  overflow: hidden;
  transition: height var(--speed) ease;

    #menu {
      width: 100%;
    }
}
</style>
