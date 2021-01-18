<template>
  <div id="app">
    <navbar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Nav';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>


<style>
/*styles css*/
body {
  height: 100%;
  display: flex;
  background-color: rgb(255, 255, 255);
}
#app {
  font-family: Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  flex-grow: 1;
  width: 100%;  
}
.content-app {
  margin-top: 80px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.card {
  box-shadow: 1px 6px 24px #d2d2d2;
  margin-top: 5px;
}
.card .card-header {
  background: linear-gradient(top,rgb(255, 255, 255), #ecdfea);background-color: whitesmoke;
  font-size: 2em;
}
.second {
  background-color: rgb(232, 232, 233);
}
.modal .modal-header {
    border-block-end-color: white;
}
</style>
