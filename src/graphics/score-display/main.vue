<template>
    <TopBar />
    <MatchInfo />
    <Omnibar />
  </template>
  
  <script setup lang="ts">
    import Omnibar from '../components/Omnibar.vue';
    import MatchInfo from '../components/MatchInfo.vue';
    import TopBar from '../components/TopBar.vue';

    //TODO this is just the base without implementation, if we ever expand this, make this an actual component 

  </script>
  
  <style>
    @import url('../css/base.css');
  </style>
