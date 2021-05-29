<template>
  <div>
    <div id="item-group" @click="menuScreen = 'menu'" v-show="menuScreen === undefined">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div id="dropdown" v-show="menuScreen !== undefined">
      <transition>
        <div id="menu" v-show="menuScreen === 'menu'">
          <DropdownItem @click="menuScreen = 'queue'">
            <template v-slot:leftIcon><OptionsIcon/></template> 
            Queue
            <template v-slot:rightIcon><ChevronIcon/></template> 
          </DropdownItem>
          <DropdownItem @click="menuScreen = 'history'">
            <template v-slot:leftIcon><HistoryIcon/></template> 
            History
            <template v-slot:rightIcon><ChevronIcon/></template> 
          </DropdownItem>
          <DropdownItem @click="menuScreen = 'settings'">
            <template v-slot:leftIcon><OptionsIcon/></template> 
            Settings
            <template v-slot:rightIcon><ChevronIcon/></template> 
          </DropdownItem>
        </div>
      </transition>

      <transition>
        <div id="queue" v-if="menuScreen === 'queue'">
          <DropdownItem @click="menuScreen = 'menu'">
            <template v-slot:leftIcon><ArrowIcon/></template>
            <h3>Queue</h3>
          </DropdownItem>
        </div>
      </transition>

      <transition>
        <div id="history" v-if="menuScreen === 'history'">
          <DropdownItem @click="menuScreen = 'menu'">
            <template v-slot:leftIcon><ArrowIcon/></template>
            <h3>History</h3>
          </DropdownItem>
        </div>
      </transition>

      <transition>
        <div id="settings" v-if="menuScreen === 'settings'">
          <DropdownItem @click="menuScreen = 'menu'">
            <template v-slot:leftIcon><ArrowIcon/></template>
            <h3>Settings</h3>
          </DropdownItem>
          <DropdownItem>Quality</DropdownItem>
          <DropdownItem>Theme</DropdownItem>
          <DropdownItem>Genres Library</DropdownItem>
          <DropdownItem>About</DropdownItem>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DropdownItem from './DropdownItem.vue'

//icons
import ChevronIcon from '@/assets/icons/ui/chevron-forward.svg'
import ArrowIcon from '@/assets/icons/ui/arrow-back.svg'
import OptionsIcon from '@/assets/icons/ui/settings.svg'
import HistoryIcon from '@/assets/icons/ui/history.svg'

export default defineComponent({
  name: 'AppMenu',
  components: { DropdownItem, ChevronIcon, ArrowIcon, OptionsIcon, HistoryIcon },

  data() {
    return {
      menuScreen: undefined as String | undefined
    }
  },
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
  max-height: 80vh;
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

.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.6s ease-out;
}

.slide-left-enter-to {
  position: absolute;
  transform: translateX(-110%);
}
.slide-left-enter-from {
  transform: translateX(0%);
  transition: all var(--speed) ease;
}
.slide-left-leave-to {
  position: absolute;
  right: -100%;
}
.slide-left-leave-from {
  transform: translateX(-110%);
  transition: all var(--speed) ease;
}

//Slide right
.slide-right-enter-to {
  position: absolute;
  transform: translateX(110%);
}
.slide-right-enter-from {
  transform: translateX(0%);
  transition: all var(--speed) ease;
}

.slide-right-leave-to {
  transform: translateX(110%);
  transition: all var(--speed) ease;
}
</style>
