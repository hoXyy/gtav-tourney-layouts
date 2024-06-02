<template>
  <div v-if="matches && matches.data" style="display: flex; flex-direction: column; gap: 15px">
    <QBtn color="black" @click="setMatchId('')" nodecg-dialog="add-edit-match">Add new match</QBtn>
    <QSeparator />
    <QList v-if="matches.data.length > 0" bordered class="rounded-corners"
      ><QExpansionItem
        expand-separator
        :key="match.id"
        v-for="match in matches.data"
        :label="`${match.players.player1.name} vs. ${match.players.player2.name}`"
        :caption="`${match.stage} (${match.type})`"
        ><QCard
          ><QCardSection>
            <div style="display: flex; flex-direction: column">
              <p><b>Stage: </b>{{ match.stage }}</p>
              <p>
                <b>Players: </b>{{ match.players.player1.name }} vs.
                {{ match.players.player2.name }}
              </p>
              <p v-if="match.segments.length > 0">
                <b>Segments: </b
                >{{
                  match.segments
                    .map((segment) => `${segment.name} (${segment.pickedBy})`)
                    .join(', ')
                }}
              </p>
            </div>
          </QCardSection>
          <QCardActions
            ><div>
              <QBtn flat @click="setMatchAsActive(match.id)">Set as active match</QBtn>
            </div>
            <div>
              <QBtn flat stretch @click="setMatchId(match.id)" nodecg-dialog="add-edit-match"
                >Edit match</QBtn
              ><QBtn flat stretch @click="removeMatch(match.id)">Remove match</QBtn>
            </div></QCardActions
          ></QCard
        ></QExpansionItem
      ></QList
    >
    <p v-else style="text-align: center; font-size: 20px">No matches to list.</p>
  </div>
</template>

<script setup lang="ts">
  import { useReplicant } from 'nodecg-vue-composable';
  import { CurrentMatch, Matches } from '@layouts/types';

  const matches = useReplicant<Matches>('matches', 'gtav-tourney-layouts');
  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const editedMatchId = useReplicant<string>('editedMatchId', 'gtav-tourney-layouts', {
    defaultValue: '',
  });

  function setMatchId(matchId: string) {
    editedMatchId!.data = matchId;
    editedMatchId!.save();
  }

  function removeMatch(matchId: string) {
    if (matches && matches.data) {
      const index = matches.data.findIndex((match) => match.id === matchId);
      if (index > -1) {
        matches.data.splice(index, 1);
        matches.save();
      }
    }
  }

  function setMatchAsActive(matchId: string) {
    if (matches && matches.data && currentMatch) {
      const match = matches.data.find((match) => match.id === matchId);
      if (match) {
        currentMatch.data = match;
        currentMatch.save();
      }
    }
  }
</script>
