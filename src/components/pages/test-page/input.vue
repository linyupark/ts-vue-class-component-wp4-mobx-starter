<template>
  <div>
    <p>
      (共享转局部: {{username}})
      <input type="text" v-model="username">
    </p>
    <p>
      (直接控制共享)
      <input type="text" @input="changeName" :value="name">
    </p>
  </div>
</template>

<script>
import Vue from 'vue';
import { Observer } from 'mobx-vue';
import Component from 'vue-class-component';

// 共享数据
import UserModel from '@model/User';

@Observer
@Component({
  props: {
    name: String
  }
})
export default class Input extends Vue {
  username = this.name;
  changeName(e) {
    UserModel.name = e.target.value;
  }
}
</script>
