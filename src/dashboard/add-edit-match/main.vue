<template>
  <div v-if="editedMatchData" style="display: flex; flex-direction: column; gap: 15px; width: 100%">
    <div style="display: flex; flex-direction: row; gap: 5px; justify-content: space-between">
      <QSelect
        outlined
        v-model="editedMatchData.stage"
        :options="matchStages"
        label="Tournament Stage"
        style="width: 80%" />
      <QSelect
        outlined
        v-model="editedMatchData.type"
        :options="matchTypes"
        label="Match Type"
        emit-value
        style="width: 30%"
        :display-value="matchTypes.find((type) => type.value === editedMatchData.type)?.label" />
      <QSelect
        style="width: 15%"
        outlined
        v-model="selectedHour"
        :options="hourOptions"
        label="Start Hour" />
    </div>
    <QSeparator />
    <div style="display: flex; flex-direction: column; gap: 15px">
      <p style="font-size: 26px"><b>Players</b></p>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedMatchData.players.player1.name"
          label="Player 1 Name"
          style="width: 50%" />
        <QInput
          outlined
          v-model="editedMatchData.players.player1.srcUsername"
          label="Player 1 speedrun.com name"
          style="width: 50%" />
      </div>
      <div style="display: flex; gap: 5px">
        <QInput
          outlined
          v-model="editedMatchData.players.player2.name"
          label="Player 2 Name"
          style="width: 50%" />
        <QInput
          outlined
          v-model="editedMatchData.players.player2.srcUsername"
          label="Player 2 speedrun.com name"
          style="width: 50%" />
      </div>
    </div>
    <QSeparator />
    <div style="display: flex; flex-direction: column; gap: 5px">
      <p style="font-size: 26px"><b>Segments</b></p>
      <p style="font-size: 16px">
        <b>Current segments: </b
        >{{
          editedMatchData.segments
            .map((segment) => `${segment.name} (${segment.pickedBy})`)
            .join(', ')
        }}
      </p>
      <p style="font-size: 16px">
        Head to the <b>Segment Pick/Ban</b> dashboard panel to add segments.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { CurrentMatch, Matches } from '@layouts/types';
  import { $ref } from 'vue/macros';
  import { v4 as uuid } from 'uuid';
  import { watch } from 'vue';

  const editedMatchId = useReplicant<string>('editedMatchId', 'gtav-tourney-layouts', {
    defaultValue: '',
  });

  const matches = useReplicant<Matches>('matches', 'gtav-tourney-layouts', {
    defaultValue: [],
  });

  let matchStages = $ref([
    'Swiss Stage - Round 1',
    'Swiss Stage - Round 2',
    'Swiss Stage - Round 3',
    'Swiss Stage - Round 4',
    'Swiss Stage - Round 5',
    'Round of 16',
    'Quarterfinals',
    'Semifinals',
    'Grand Finals',
  ]);

  let hourOptions = $ref([
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ]);

  let selectedHour = $ref('');

  let matchTypes = $ref([
    { label: 'Best of 1', value: 'bo1' },
    { label: 'Best of 3', value: 'bo3' },
    { label: 'Best of 5', value: 'bo5' },
  ]);

  const emptyMatchData: CurrentMatch = {
    id: '',
    stage: '',
    startTime: new Date(Date.now()).getTime(),
    type: 'bo1',
    players: {
      player1: {
        name: '',
        avatar: '',
        showAvatar: true,
      },
      player2: {
        name: '',
        avatar: '',
        showAvatar: true,
      },
    },
    segments: [],
  };

  watch(
    () => selectedHour,
    (val) => {
      if (val) {
        const date = new Date(Date.now());
        const hour = val.slice(0, 2);
        date.setHours(parseInt(hour), 0, 0, 0);
        editedMatchData.startTime = date.getTime();
      }
    },
    { immediate: true }
  );

  // added here for safety to avoid opening a panel to an empty run by accident
  watch(
    () => editedMatchId?.data,
    (val) => {
      if (val && matches && matches.data && matches.data.length > 0) {
        const match = matches.data.find((match) => match.id === val);
        if (match) {
          editedMatchData = match;
          selectedHour = `${new Date(match.startTime).getHours()}:00`;
        } else {
          editedMatchData = emptyMatchData;
          editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
          selectedHour = '';
        }
      } else {
        editedMatchData = emptyMatchData;
        editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
        selectedHour = '';
      }
    }
  );

  document.addEventListener('dialog-opened', () => {
    if (editedMatchId && matches && matches.data && matches.data.length > 0) {
      const match = matches.data.find((match) => match.id === editedMatchId.data);
      if (match) {
        editedMatchData = match;
        selectedHour = `${new Date(match.startTime).getHours()}:00`;
      } else {
        editedMatchData = emptyMatchData;
        editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
        selectedHour = '';
      }
    } else {
      editedMatchData = emptyMatchData;
      editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
      selectedHour = '';
    }
  });

  document.addEventListener('dialog-confirmed', () => {
    nodecg.sendMessage('updateMatchData', editedMatchData);
    editedMatchId!.data = '';
    editedMatchId!.save();
  });

  document.addEventListener('dialog-dismissed', () => {
    if (editedMatchId) {
      editedMatchId.data = '';
      editedMatchId!.save();
      editedMatchData = emptyMatchData;
    }
  });

  let editedMatchData = $ref<CurrentMatch>(emptyMatchData);
</script>
