<template>
  <div>
    <h1>WP4 + Typescript + Vue + Babel7 + Mobx</h1>
    <p>{{AppUser.age}}</p>
    <p>
      <router-link :to="{ name: $routerPath.test }">Test</router-link>
    </p>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Observer } from 'mobx-vue';

// 共享数据
import UserModel from '@model/User';

@Observer
@Component
export default class AppRoot extends Vue {
  AppUser = UserModel;
}
</script>