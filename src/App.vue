<template>
  <div>
    <h1>CRH Demo</h1>
      <div class="page-container">
        <transition :name="pageTransitionName">
          <router-view/>
        </transition>
      </div>
  </div>
</template>

<style lang="stylus" src="@assets/styles/global"></style>

<script>
import Vue from 'vue';
import routerSlideTo from '@lib/vue-router-history';
import Component from 'vue-class-component';

@Component({
  watch: {
    $route(to, from) {
      const direction = routerSlideTo({ to, from });
      this.pageTransitionName = direction ? `page-${direction}` : '';
    }
  }
})
export default class AppRoot extends Vue {
  pageTransitionName = '';
}
</script>
