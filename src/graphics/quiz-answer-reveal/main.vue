<template>
    <img
      src="./img/finish1.png"
    >
    </template>
  
  <script setup lang="ts">
    import { FinishTimes } from '@layouts/types';
    import { useReplicant } from 'nodecg-vue-composable';
    
    const finishTimes = useReplicant<FinishTimes>('finishTimes', 'gtav-tourney-layouts');
  </script>
  
  <style>
    @import url('../css/base.css');
  </style>
  