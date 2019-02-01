<template>
  <div id="app">
    <cs-map/>
    <cs-story/>
  </div>
</template>

<script>
  import CsStory from './components/CsStory';
  import CsMap from './components/CsMap';

  export default {
    name: 'app',
    components: {
      CsStory,
      CsMap,
    },
  };
</script>

<style>
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  #app {
    color: #2c3e50;
    font-family: Georgia, "times new roman", times, serif;
  }

  .cs-story,
  .cs-map {
    width: 50%;
    position: relative;
    float: left;
  }

  .cs-map {
    height: 100%;
  }
</style>
