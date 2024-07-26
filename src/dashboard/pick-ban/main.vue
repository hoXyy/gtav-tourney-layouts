<template>
  <div
    v-if="
      currentMatch &&
      currentMatch.data &&
      matches &&
      matches.data &&
      segmentPicks &&
      segmentPicks.data &&
      segmentBans &&
      segmentBans.data
    "
    style="display: flex; flex-direction: column; gap: 15px">
    <div
      v-for="segment in segments"
      style="display: flex; flex-direction: column; text-align: center; justify-content: center">
      <p style="font-size: 16px">
        <b>{{ segment }}</b>
      </p>
      <div style="display: flex; gap: 10px; justify-content: center">
        <QBtnDropdown
          :disable="
            segmentBans.data.find((val) => val.name === segment) != undefined ||
            segmentPicks.data.find((val) => val.name === segment) != undefined
          "
          color="black"
          label="Pick"
          style="width: 30%">
          <QList
            ><QItem
              @click="pickSegment(segment, currentMatch!.data!.players.player1.name)"
              clickable
              v-close-popup
              v-if="currentMatch.data.players.player1">
              <QItemSection
                ><QItemLabel>{{ currentMatch.data.players.player1.name }}</QItemLabel></QItemSection
              >
            </QItem>
            <QItem
              @click="pickSegment(segment, currentMatch!.data!.players.player2.name)"
              clickable
              v-close-popup
              v-if="currentMatch.data.players.player2">
              <QItemSection>
                <QItemLabel>{{ currentMatch.data.players.player2.name }}</QItemLabel>
              </QItemSection>
            </QItem>
          </QList>
        </QBtnDropdown>
        <QBtnDropdown
          :disable="
            segmentBans.data.find((val) => val.name === segment) != undefined ||
            segmentPicks.data.find((val) => val.name === segment) != undefined
          "
          color="black"
          label="Ban"
          style="width: 30%"
          ><QList
            ><QItem
              @click="banSegment(segment, currentMatch!.data!.players.player1.name)"
              clickable
              v-close-popup
              v-if="currentMatch.data.players.player1"
              ><QItemSection
                ><QItemLabel>{{ currentMatch.data.players.player1.name }}</QItemLabel></QItemSection
              ></QItem
            ><QItem
              @click="banSegment(segment, currentMatch!.data!.players.player2.name)"
              clickable
              v-close-popup
              v-if="currentMatch.data.players.player2"
              ><QItemSection
                ><QItemLabel>{{ currentMatch.data.players.player2.name }}</QItemLabel></QItemSection
              ></QItem
            ></QList
          ></QBtnDropdown
        >
        <QBtn
          color="black"
          :disable="segmentPicks.data.find((val) => val.name === segment) != undefined"
          @click="pickSegment(segment, 'Decider')"
          v-if="
            segmentBans.data.length + segmentPicks.data.length >= 8 &&
            !segmentPicks.data.find((val) => val.name === segment) &&
            !segmentBans.data.find((val) => val.name === segment)
          "
          style="width: 30%"
          >Decider</QBtn
        >
      </div>
    </div>
    <QBtn color="black" @click="resetPicks">Reset Picks</QBtn>
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { CurrentMatch, CurrentSegment, Matches } from '@layouts/types';
  import { $ref } from 'vue/macros';
  import { watch } from 'vue';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const matches = useReplicant<Matches>('matches', 'gtav-tourney-layouts');
  const segmentPicks = useReplicant<CurrentSegment[]>('segmentPicks', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
  const segmentBans = useReplicant<CurrentSegment[]>('segmentBans', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
  const currentSegment = useReplicant<CurrentSegment | undefined>(
    'currentSegment',
    'gtav-tourney-layouts'
  );

  let currentMatchIndex = -1;

  const segments = $ref([
    'Trevor%',
    'Countryside',
    'Blitz Play',
    'Deep Inside',
    'Fresh Meat',
    'The Third Way',
    'All Stunt Jumps',
    'All Races',
    'Epsilon Program',
  ]);

  type Segments =
    | 'Trevor%'
    | 'Countryside'
    | 'Blitz Play'
    | 'Deep Inside'
    | 'Fresh Meat'
    | 'The Third Way'
    | 'All Stunt Jumps'
    | 'All Races'
    | 'Epsilon Program';

  function pickSegment(segmentName: string, pickedBy: string) {
    if (segmentPicks && segmentPicks.data) {
      const segment = { name: segmentName as Segments, pickedBy, wonBy: null };
      if (matches && matches.data) {
        matches.data[currentMatchIndex].segments.push(segment);
        matches.save();
      }
      segmentPicks.data.push(segment);
      segmentPicks.save();
    }
  }

  function banSegment(segmentName: string, pickedBy: string) {
    if (segmentBans && segmentBans.data) {
      const segment = { name: segmentName as Segments, pickedBy, wonBy: null };
      segmentBans.data.push(segment);
      segmentBans.save();
    }
  }

  function resetPicks() {
    if (segmentBans && segmentPicks && currentSegment) {
      segmentBans.data = [];
      segmentPicks.data = [];
      currentSegment.data = undefined;

      segmentBans.save();
      segmentPicks.save();
      currentSegment.save();

      if (matches && matches.data) {
        matches.data[currentMatchIndex].segments = [];
        matches.save();
      }
    }
  }

  watch(
    () => currentMatch?.data,
    (val, oldVal) => {
      if (val && matches && matches.data) {
        const index = matches.data.findIndex((match) => val.id === match.id);
        if (index > -1) {
          currentMatchIndex = index;
        }
      }
      if (val && val.id) {
        // if new match, reset picks
        if (oldVal && val.id != oldVal.id) {
          resetPicks();
        } else if (!oldVal) {
          resetPicks();
        }
      }
    },
    { immediate: true }
  );
</script>
