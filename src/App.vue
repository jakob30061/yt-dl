<template>
  <router-view v-slot="{ Component }">
    <transition :name="animationType">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data() {
    return {
      animationType: new String(),
    }
  },

  watch: {
    '$route'(to, from){
      this.animationType = (from.meta.orientation < to.meta.orientation ? 'slide-right' : (from.meta.orientation != to.meta.orientation ? 'slide-left' : 'fade'));
    }
  },
});
</script>

<style lang="scss" scoped>
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.6s ease-out;
}

.slide-left-enter-to {
  position: absolute;
  left: 0;
}
.slide-left-enter-from {
  position: absolute;
  left: -100%;
}
.slide-left-leave-to {
  position: absolute;
  right: -100%;
}
.slide-left-leave-from {
  position: absolute;
  right: 0;
}

//Slide right
.slide-right-enter-to {
  position: absolute;
  right: 0;
}
.slide-right-enter-from {
  position: absolute;
  right: -100%;
}
.slide-right-leave-to {
  position: absolute;
  left: -100%;
}
.slide-right-leave-from {
  position: absolute;
  left: 0;
}
</style>
