<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style>
  .loader {
    border: 16px solid transparent;
    border-top: 16px solid #e91e63; /* Blue */
    border-bottom: 16px solid #e91e63; /* Blue */
    border-radius: 50%;
    width: 35px;
    height: 35px;
    animation: spin 2s linear infinite;
    border-width: 3px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .loader-class {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
