<template>
  <!-- 为容器增加 router 切换效果的组件 -->
  <div class="router-transition">
    <transition :name="transitionName">
      <slot />
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
@import './assets/style'
</style>


<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import routerSlideTo from './router.history';
@Component({
  props: {
    /**
     * 使用哪种交互模式 [fade | slide | none]
     */
    type: {
      type: String,
      default: 'slide'
    }
  },
  watch: {
    $route(to, from) {
      let direction = routerSlideTo({ to, from, native: !this.isSlotClick });
      if (this.type === 'none' || direction === 'none') {
        return this.transitionName = '';
      }
      this.transitionName = `router-transition-${this.type}-${direction}`;
      this.isSlotClick = false;
    }
  }
})
export default class ModuleRouterTransition extends Vue {

  transitionName = '';
  isSlotClick = false;

  mounted() {
    const isSlotClick = () => {
      this.isSlotClick = true;
    }
    this.$el.addEventListener('click', isSlotClick);
  }
}
</script>
