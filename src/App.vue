<template>
  <div>
    <h1>CRH Demo</h1>
      <RouterTransition type="slide">
        <router-view/>
      </RouterTransition>
  </div>
</template>

<style lang="stylus" src="@assets/styles/global"></style>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import RouterTransition from '@module/router-transition';

@Component({
  components: {
    RouterTransition
  }
})
export default class AppRoot extends Vue {}
</script>
