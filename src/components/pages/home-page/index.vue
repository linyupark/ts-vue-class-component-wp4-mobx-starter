<template>
  <div>
    <p>
      Hello, {{AppUser.name}} (age: {{ AppUser.age }})
    </p>
    <p>
      <router-link :to="$App.router.path('test')">Test Page</router-link>
    </p>
  </div>
</template>

<script>
  // 老写法
  import { Observer } from 'mobx-vue';
  import UserModel from '@model/User';
  export default Observer({
    components: {},
    props: {},
    data() {
      return {
        AppUser: UserModel
      }
    },
    methods: {},
    computed: {},
    mounted() {
    },
  });
</script>
