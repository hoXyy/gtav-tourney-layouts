<template>
  <div style="position: absolute; bottom: -6px; z-index: 6">
    <marquee
      v-if="matches && matches.data && commentators && commentators.data && omnibarfield && omnibarfield.data != undefined"
      style="
        color: white;
        position: absolute;
        bottom: -35px;
        width: 1851px;
        font-family: 'Europa Grotesk SH DemBol';
        font-size: 50px;
        text-shadow: -3px 4px 0px rgba(0, 0, 0, 1);
      ">
      <p v-if="isIntermission">
        <span style="margin-right: 80px"
          >Feel like supporting the tournament in style? Pick some of our exclusive merch up with !merch in chat!</span
        >
        <span style="margin-right: 80px"
          >Check out our commentators with !commentary in the chat!</span
        >
        <span style="margin-right: 80px;"
          >Feeling the gambling itch? We have Twitch Channel Point predictions running for each game, so bet on your favorites!</span
        >
        <span>{{ omnibarfield.data }}</span>
      </p>
      <p v-else-if="isIntermissionInterview">
        <span style="margin-right: 80px"
          >Feel like supporting the tournament in style? Pick some of our exclusive merch up with !merch in chat!</span
        >
        <span style="margin-right: 80px"
          >Check out our commentators with !commentary in the chat!</span
        >
        <span style="margin-right: 80px;"
          >Feeling the gambling itch? We have Twitch Channel Point predictions running for each game, so bet on your favorites!</span
        >
        <span style="margin-right: 80px;"
          >{{ omnibarfield.data }}</span
        >
        <span v-if="getNextMatchString()">{{ getNextMatchString() }}</span>
      </p>
      <p v-else>
        <span style="margin-right: 80px"
          >Feel like supporting the tournament in style? Pick some of our exclusive merch up with !merch in chat!</span
        >
        <span style="margin-right: 80px">
          {{ hostsLabel }} on deck: {{ hostsData }}. Enjoying their banter? Check out our cast
          with !commentary in the chat!
        </span>
        <span style="margin-right: 80px;"
          >Feeling the gambling itch? We have Twitch Channel Point predictions running for each game, so bet on your favorites!</span
        >
        <span style="margin-right: 80px;"
          >{{ omnibarfield.data }}</span>
        <span v-if="getNextMatchString()">{{ getNextMatchString() }}</span>
      </p>
    </marquee>
    <img src="../img/omnibar.png" />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, Matches } from '@layouts/types';
  import { Commentators, Configschema, Omnibarfield } from '@layouts/types/schemas';
  import { $computed, $ref } from 'vue/macros';
  import { useReplicant } from 'nodecg-vue-composable';
  import { timeToMatch } from '../time-to-run';
import { computed } from 'vue';
  const currentOBSScene = useReplicant<string>('currentObsScene', 'gtav-tourney-layouts');
  const matches = useReplicant<Matches>('matches', 'gtav-tourney-layouts');
  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const commentators = useReplicant<Commentators>('commentators', 'gtav-tourney-layouts');
  const hosts = useReplicant<Commentators>('hosts', 'gtav-tourney-layouts');
  const omnibarfield = useReplicant<Omnibarfield>('omnibarfield', 'gtav-tourney-layouts');

  //TODO make bobar title a field, sth like quiz title? or just dashboard?

  const isIntermission = $computed(() => {
    return currentOBSScene?.data === (nodecg.bundleConfig as Configschema).obs.intermission;
  });

  const isIntermissionInterview = $computed(() => {
    return currentOBSScene?.data === (nodecg.bundleConfig as Configschema).obs.intermission_interview;
  });

  const hostsLabel = computed(() => {
    if (currentMatch === null) return 'Commentators'; 
    return currentMatch?.data?.type === 'quiz' ? 'Hosts' : 'Commentators';
  });

  const hostsData = computed(() => {
    if (currentMatch === null) return commentators?.data; 
    return currentMatch?.data?.type === 'quiz' ? hosts?.data : commentators?.data;
  });

  function getNextMatchString() {
    if (currentMatch && currentMatch.data && matches && matches.data) {
      const currentIndex = matches.data.findIndex((match) => match.id === currentMatch.data?.id);
      if (currentIndex > -1) {
        const nextMatch = matches.data[currentIndex + 1];
        if (nextMatch) {
          return `Next match: ${nextMatch.players.player1.name} vs. ${nextMatch.players.player2.name} | Starting in ${timeToMatch(nextMatch)}`;
        } else {
          return '';
        }
      }
    } else {
      return '';
    }
  }
</script>
