<template>
  <div>
    <TopBar />
        
    <!-- BO1 component-->
    <img 
      v-if="currentSegment && currentSegment.data"
      style="position: absolute; z-index: 1"
      :src= "imageSrc"
    />

    <!-- BO3 component 
    <div class="container">
      <img src="./img/bo3lines.png" class="bolines">
      <div class="grid">
        <div class="category style-three-one">
          <img src="./img/ttw.png">
        </div>
        <div class="category mask-three-two">
          <img src="./img/countryside.png" class="style-three-two">
        </div>
        <div class="category mask-three-three">
          <img src="./img/countryside.png" class="style-three-three">
        </div>
      </div>
    </div>
  -->
    
    <!-- BO5 component 
    <div class="container">
      <img src="./img/bo5lines.png" class="bolines">
      <div class="grid-5">
        <div class="category style-five-one">
          <img src="./img/asj.png">
        </div>
        <div class="category mask-five-two">
          <img src="./img/ttw.png" class="style-five-two">
        </div>
        <div class="category mask-five-three">
          <img src="./img/countryside.png" class="style-five-three">
        </div>
        <div class="category mask-five-four">
          <img src="./img/ttw.png" class="style-five-four">
        </div>
        <div class="category mask-five-five">
          <img src="./img/races.png" class="style-five-five">
        </div>
      </div>
    </div>
    -->
    
    <MatchInfo />
    <Omnibar />
    </div>
  </template>
  
  <script setup lang="ts">
    import { CurrentMatch, CurrentSegment } from '@layouts/types';
    import { useReplicant } from 'nodecg-vue-composable';
    import TopBar from '../components/TopBar.vue';
    import MatchInfo from '../components/MatchInfo.vue';
    import Omnibar from '../components/Omnibar.vue';
    import { computed, watch } from 'vue';
    import { $ref } from 'vue/macros';
  
    const shortNames = {
    'The Third Way': 'TTW',
    'Deep Inside': 'DI',
    'Fresh Meat': 'FM',
    'Trevor%': 'TR',
    'Countryside': 'CS',
    'Blitz Play': 'BP',
    'All Stunt Jumps': 'ASJ',
    'All Races': 'AR',
    'Epsilon Program': 'EP',
  };

    const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');

    const imageSrc = computed(() => {
      if (currentSegment?.data?.name) {
      const result = new URL(`./img/Categories/${shortNames[currentSegment.data.name]}.png`, import.meta.url).href;
        return result;
      }
      return '';
    });

  </script>
  
  <style>
    @import url('../css/base.css');
  </style>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%; 
}

.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%; 
}

.bolines {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%; 
}

.category {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.style-three-one {
  left: -40%;
}

.style-five-one {
  left: -45%;
}

.style-three-two {
  display: block;
  margin-right: 5%;
}

.style-three-three {
  display: block;
  margin-left: 65%;
}

.style-five-two {
  display: block;
  margin-right: 50%;
}

.style-five-three {
  display: block;
  margin-right: 10%;
}

.style-five-four {
  display: block;
  margin-left: 33%;
}

.style-five-five {
  display: block;
  margin-left: 75%;
}

.mask-three-two {
  -webkit-mask-image: url("./img/bo32.png");
  mask-image: url("./img/bo32.png");
}

.mask-three-three {
  -webkit-mask-image: url("./img/bo33.png");
  mask-image: url("./img/bo33.png");
}

.mask-five-two {
  -webkit-mask-image: url("./img/bo52.png");
  mask-image: url("./img/bo52.png");
}

.mask-five-three {
  -webkit-mask-image: url("./img/bo53.png");
  mask-image: url("./img/bo53.png");
}

.mask-five-four {
  -webkit-mask-image: url("./img/bo54.png");
  mask-image: url("./img/bo54.png");
}

.mask-five-five {
  -webkit-mask-image: url("./img/bo55.png");
  mask-image: url("./img/bo55.png");
}

.category img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>