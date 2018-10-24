<template>
  <div>
    <p>name: {{user.name}}</p>
    <p>age: {{user.age}}</p>
    <p>
      <router-link :to="$App.router.path('home')">Home Page</router-link>
    </p>
    <p>
      <Input :name="user.name" />
    </p>
    <button @click="increaseAge">Add Age</button>
  </div>
</template>

<style lang="stylus" src="./assets/style" scoped></style>
<script lang="ts" src="./index.controller"></script>