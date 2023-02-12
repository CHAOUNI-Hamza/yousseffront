<template lang="">
  <div>
    <h1>Dashboard</h1>
    <button>
      <router-link :to="{ name: 'Projet' }">Projet</router-link>
    </button>
    <button>
      <router-link :to="{ name: 'Status' }">Status</router-link>
    </button>
    <button>
      <router-link :to="{ name: 'Task' }">Task</router-link>
    </button>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
