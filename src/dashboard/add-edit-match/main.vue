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
    'Quarterfinals',
    'Semifinals',
    'Grand Finals',
  ]);

  let matchTypes = $ref([
    { label: 'Best of 1', value: 'bo1' },
    { label: 'Best of 3', value: 'bo3' },
    { label: 'Best of 5', value: 'bo5' },
  ]);

  const emptyMatchData: CurrentMatch = {
    id: '',
    stage: '',
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

  // added here for safety to avoid opening a panel to an empty run by accident
  watch(
    () => editedMatchId?.data,
    (val) => {
      if (val && matches && matches.data && matches.data.length > 0) {
        const match = matches.data.find((match) => match.id === val);
        if (match) {
          editedMatchData = match;
        } else {
          editedMatchData = emptyMatchData;
          editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
        }
      } else {
        editedMatchData = emptyMatchData;
        editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
      }
    }
  );

  document.addEventListener('dialog-opened', () => {
    if (editedMatchId && matches && matches.data && matches.data.length > 0) {
      const match = matches.data.find((match) => match.id === editedMatchId.data);
      if (match) {
        editedMatchData = match;
      } else {
        editedMatchData = emptyMatchData;
        editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
      }
    } else {
      editedMatchData = emptyMatchData;
      editedMatchData.id = uuid(); // This 99% of the time means it's adding a new run, so create new ID for it
    }
  });

  document.addEventListener('dialog-confirmed', () => {
    if (matches && matches.data) {
      if (matches.data.length > 0) {
        const index = matches.data.findIndex((match) => match.id === editedMatchData.id);
        if (index > -1) {
          matches.data[index] = editedMatchData;
        } else {
          matches.data.push(editedMatchData);
        }
        matches.save();
      } else {
        matches.data.push(editedMatchData);
        matches.save();
      }
    }
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
