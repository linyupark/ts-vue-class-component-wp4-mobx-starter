import Vue from 'vue';
import { Observer } from 'mobx-vue';
import Component from 'vue-class-component';

// 共享数据
import UserModel from '@model/User';

@Observer
@Component({
  components: {
    Input: () => import(/* webpackChunkName: "test-page-input" */ './input.vue')
  }
})
export default class TestPage extends Vue {
  user = UserModel;
  increaseAge() {
    this.user.increaseAge();
  }
}
