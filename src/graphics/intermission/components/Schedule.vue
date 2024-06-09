<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 33px;
      position: absolute;
      top: 323px;
      right: 20px;
      text-align: right;
      align-items: flex-end;
      z-index: 2;
    ">
    <div
      v-for="match in nextMatches"
      :key="match.id"
      style="display: flex; flex-direction: row; gap: 15px">
      <div
        style="
          font-size: 67px;
          line-height: 70px;
          margin-top: -12px;
          display: flex;
          flex-direction: column;
          gap: 0px;
          margin-bottom: -15px;
        ">
        <div style="font-family: 'Europa Grotesk SH DemBol'">
          <b>{{ match.players.player1.name }}</b> <span style="font-size: 40px">vs </span>
          <b>{{ match.players.player2.name }}</b>
        </div>
        <div>
          <div
            style="
              padding-left: 5px;
              padding-right: 6px;
              color: #ffde1b;
              font-family: 'Bebas Neue';
              line-height: 59px;
              font-size: 56px;
              max-width: 100%;
            "
            v-if="timeToMatch(match)">
            <span>in {{ timeToMatch(match) }}</span>
          </div>
        </div>
      </div>
      <div
        style="font-size: 133px; width: 167px; height: 123px; line-height: 135px"
        :style="{
          backgroundColor: match.type == 'showmatch' ? '#ffde1b' : '#ff266a',
          color: match.type == 'showmatch' ? 'black' : 'white',
          textAlign: 'center',
        }">
        <span style="margin-left: 3px"
          ><template v-if="match.type != 'showmatch'">{{ match.type }}</template
          ><template v-else>SC</template></span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { timeToMatch } from '@layouts/graphics/time-to-run';
  import { Matches } from '@layouts/types';

  const props = defineProps<{ nextMatches: Matches }>();
</script>
