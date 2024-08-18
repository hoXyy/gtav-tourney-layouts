<template>
  <div>
    <TopBar />
    
    <!-- Background -->
    <div id="background">
      <img class="bg" src="./img/background.png" />
    </div>

    <!-- Main Container -->
    <div id="container">
      <!-- Player 1 Data -->
      <div id="player1" class="player-section">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name1">
            {{ currentMatch.data.players.player1.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar1"
            v-bind:src="currentMatch.data.players.player1.showAvatar && avatars?.data?.player1 ? avatars.data.player1 : '../img/nopic.png'"
          />
        </div>
        <img src="./img/pink.png" class="color-overlay color-pink" />
      </div>

      <!-- Player 2 Data -->
      <div id="player2" class="player-section">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name2">
            {{ currentMatch.data.players.player2.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar2"
            v-bind:src="currentMatch.data.players.player2.showAvatar && avatars?.data?.player2 ? avatars.data.player2 : '/img/nopic.png'"
          />
        </div>
        <img src="./img/yellow.png" class="color-overlay color-yellow" />
      </div>

      <!-- Player 3 Data -->
      <div id="player3" class="player-section">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name3">
            {{ currentMatch.data.players.player3.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar3"
            v-bind:src="currentMatch.data.players.player3.showAvatar && avatars?.data?.player3 ? avatars.data.player3 : require('../img/nopic.png')"
          />
        </div>
        <img src="./img/purple.png" class="color-overlay color-purple" />
      </div>

      <!-- Player 4 Data -->
      <div id="player4" class="player-section">
        <div class="player-info">
          <p v-if="currentMatch && currentMatch.data" class="player-name player-name4">
            {{ currentMatch.data.players.player4.name }}
          </p>
          <img
            v-if="currentMatch && currentMatch.data" class="player-avatar player-avatar4"
            v-bind:src="currentMatch.data.players.player4.showAvatar && avatars?.data?.player4 ? avatars.data.player4 : '../img/nopic.png'"
          />
        </div>
          <img src="./img/teal.png" class="color-overlay color-teal" />
      </div>
    </div>

    <!-- Timer & Question -->
    <p v-if="timer && timer.data" class="timer">
      {{ timer.data.time }}
    </p>
    <img src="./img/questions.png" class="question" />
    <div class="questionamountbox">
      <p v-if="currentQuestion && currentQuestion.data" class="question-id">
      QUESTION {{ currentQuestion.data.id }}/{{ question?.data?.length }}
      </p>
    </div>
    <div class="animate__animated animate__fadeInRightBig" ref="questionSlide" >
      <img src="./img/questionslide.png" class="questionslide"/>
      <div class="questionbox">
      <p v-if="currentQuestion && currentQuestion.data" class="question-text">
      {{ currentQuestion.data.question }}
      </p>
      </div>
    </div>

    <!-- Answer 1 -->
    <div v-if="showingAnswerA?.data">
      <div class="animate__animated animate__fadeInRightBig animate__animated animate__animate__flash" ref="answer1Slide">
        <div
          v-if="!setCorrectAnswerA?.data">
          <div
            v-if="currentQuestion?.data?.type==='normal'">
            <img
            src="./img/answerslide4.png"
            class="answerslide"
          />
          <div class="answer1box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer1 }}
            </p>
          </div>
          </div>
          <div
          v-if="currentQuestion?.data?.type!=='normal'">
          <img
            src="./img/enum.png"
            class="answerslide"
          />
          <div class="answer1box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer1 }}
            </p>
          </div>
          </div>
        </div>
        <div
        v-else>
          <img
          src="./img/correct4.png"
          class="answerslide"
        />
        <div class="answer1box">
          <p v-if="currentQuestion && currentQuestion.data" class="answer-textALT">
            {{ currentQuestion.data.answers.answer1 }}
          </p>
        </div>
      </div>
        </div>
        <div
        v-if="setPinkPick?.data ==='A'">
          <img src="./img/a14.png" class="answerslide">
        </div>
        <div
        v-if="setYellowPick?.data ==='A'">
          <img src="./img/a13.png" class="answerslide">
        </div>
        <div
        v-if="setPurplePick?.data ==='A'">
          <img src="./img/a12.png" class="answerslide">
        </div>
        <div
        v-if="setTealPick?.data ==='A'">
          <img src="./img/a11.png" class="answerslide">
        </div>
    </div>

    <!-- Answer 2 -->
    <div v-if="showingAnswerB?.data">
      <div class="animate__animated animate__fadeInRightBig animate__animated animate__animate__flash" ref="answer2Slide">
        <div
          v-if="!setCorrectAnswerB?.data">
          <div
            v-if="currentQuestion?.data?.type==='normal'">
            <img
            src="./img/answerslide3.png"
            class="answerslide"
          />
          <div class="answer2box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer2 }}
            </p>
          </div>
        </div>
        <div
          v-if="currentQuestion?.data?.type!=='normal'">
          <img
            src="./img/enum2.png"
            class="answerslide"
          />
          <div class="answer2box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer2 }}
            </p>
          </div>
          </div>
        </div>
        <div
        v-else>
          <img
          src="./img/correct3.png"
          class="answerslide"
        />
        <div class="answer2box">
          <p v-if="currentQuestion && currentQuestion.data" class="answer-textALT">
            {{ currentQuestion.data.answers.answer2 }}
          </p>
        </div>
      </div>
        </div>
        <div
        v-if="setPinkPick?.data ==='B'">
          <img src="./img/a24.png" class="answerslide">
        </div>
        <div
        v-if="setYellowPick?.data ==='B'">
          <img src="./img/a23.png" class="answerslide">
        </div>
        <div
        v-if="setPurplePick?.data ==='B'">
          <img src="./img/a22.png" class="answerslide">
        </div>
        <div
        v-if="setTealPick?.data ==='B'">
          <img src="./img/a21.png" class="answerslide">
        </div>
    </div>

    <!-- Answer 3 -->
    <div v-if="showingAnswerC?.data">
      <div class="animate__animated animate__fadeInRightBig animate__animated animate__animate__flash" ref="answer3Slide">
        <div
          v-if="!setCorrectAnswerC?.data">
          <div
            v-if="currentQuestion?.data?.type==='normal'">
            <img
            src="./img/answerslide2.png"
            class="answerslide"
          />
          <div class="answer3box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer3 }}
            </p>
          </div>
        </div>
        <div
          v-if="currentQuestion?.data?.type!=='normal'">
          <img
            src="./img/enum3.png"
            class="answerslide"
          />
          <div class="answer3box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer3 }}
            </p>
          </div>
          </div>
        </div>
        <div
        v-else>
          <img
          src="./img/correct2.png"
          class="answerslide"
        />
        <div class="answer3box">
          <p v-if="currentQuestion && currentQuestion.data" class="answer-textALT">
            {{ currentQuestion.data.answers.answer3 }}
          </p>
        </div>
      </div>
        </div>
        <div
        v-if="setPinkPick?.data ==='C'">
          <img src="./img/a34.png" class="answerslide">
        </div>
        <div
        v-if="setYellowPick?.data ==='C'">
          <img src="./img/a33.png" class="answerslide">
        </div>
        <div
        v-if="setPurplePick?.data ==='C'">
          <img src="./img/a32.png" class="answerslide">
        </div>
        <div
        v-if="setTealPick?.data ==='C'">
          <img src="./img/a31.png" class="answerslide">
        </div>
    </div>

    <!-- Answer 4 -->
    <div v-if="showingAnswerD?.data">
      <div class="animate__animated animate__fadeInRightBig animate__animated animate__animate__flash" ref="answer4Slide">
        <div
          v-if="!setCorrectAnswerD?.data">
          <div
            v-if="currentQuestion?.data?.type==='normal'">
            <img
            src="./img/answerslide.png"
            class="answerslide"
          />
          <div class="answer4box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer4 }}
            </p>
          </div>
          </div>
          <div
          v-if="currentQuestion?.data?.type!=='normal'">
          <img
            src="./img/enum4.png"
            class="answerslide"
          />
          <div class="answer4box">
            <p v-if="currentQuestion && currentQuestion.data" class="answer-text">
              {{ currentQuestion.data.answers.answer4 }}
            </p>
          </div>
          </div>
        </div>
        <div
        v-else>
          <img
          src="./img/correct.png"
          class="answerslide"
        />
        <div class="answer4box">
          <p v-if="currentQuestion && currentQuestion.data" class="answer-textALT">
            {{ currentQuestion.data.answers.answer4 }}
          </p>
        </div>
      </div>
        </div>
        <div
        v-if="setPinkPick?.data ==='D'">
          <img src="./img/a44.png" class="answerslide">
        </div>
        <div
        v-if="setYellowPick?.data ==='D'">
          <img src="./img/a43.png" class="answerslide">
        </div>
        <div
        v-if="setPurplePick?.data ==='D'">
          <img src="./img/a42.png" class="answerslide">
        </div>
        <div
        v-if="setTealPick?.data ==='D'">
          <img src="./img/a41.png" class="answerslide">
        </div>
    </div>

    <!-- Bobar -->
    <img src="./img/bobar.png" class="bottom-overlay" />
    <div id="scores" class="scores">
      <p class="score1" v-if="score && score.data">
          {{ score.data.player1 }} POINTS <br>
      </p>
      <p class="score2" v-if="score && score.data">
          {{ score.data.player2 }} POINTS
      </p>
      <p class="score3" v-if="score && score.data">
          {{ score.data.player3 }} POINTS
      </p>
      <p class="score4" v-if="score && score.data">
          {{ score.data.player4 }} POINTS
      </p>
    </div>
    <div id="names" class="score-names">
      <p class="score-name1" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player1.name }}'s SCORE
      </p>
      <p class="score-name2" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player2.name }}'s SCORE
      </p>
      <p class="score-name3" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player3.name }}'s SCORE
      </p>
      <p class="score-name4" v-if="currentMatch?.data">
        {{ currentMatch?.data?.players.player4.name }}'s SCORE
      </p>
    </div>

    <Omnibar />
  </div>
</template>

<script setup lang="ts">
  import { CurrentMatch, CurrentSegment, PlayerPbs, Score, Avatars, currentQuestion, questions } from '@layouts/types';
  import { useReplicant } from 'nodecg-vue-composable';
  import TopBar from '../components/TopBar.vue';
  import MatchInfo from '../components/MatchInfo.vue';
  import Omnibar from '../components/Omnibar.vue';
  import { Timer } from '@layouts/types/schemas';
  import { nextTick, watch, ref } from 'vue';
  import 'animate.css';

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');
  const currentQuestion = useReplicant<currentQuestion>('currentQuestion', 'gtav-tourney-layouts');
  const currentSegment = useReplicant<CurrentSegment>('currentSegment', 'gtav-tourney-layouts');
  const playerPbs = useReplicant<PlayerPbs>('playerPbs', 'gtav-tourney-layouts');
  const score = useReplicant<Score>('score', 'gtav-tourney-layouts');
  const timer = useReplicant<Timer>('timer', 'gtav-tourney-layouts');
  const question = useReplicant<questions>('questions', 'gtav-tourney-layouts');
  const avatars = useReplicant<Avatars>('playerAvatars', 'gtav-tourney-layouts');

  const showingAnswerA = useReplicant<boolean>('showsAnswerA', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const showingAnswerB = useReplicant<boolean>('showsAnswerB', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const showingAnswerC = useReplicant<boolean>('showsAnswerC', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const showingAnswerD = useReplicant<boolean>('showsAnswerD', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const setCorrectAnswerA = useReplicant<boolean>('correctsAnswerA', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const setCorrectAnswerB = useReplicant<boolean>('correctsAnswerB', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const setCorrectAnswerC = useReplicant<boolean>('correctsAnswerC', 'gtav-tourney-layouts', {
    defaultValue: false
  });
  const setCorrectAnswerD = useReplicant<boolean>('correctsAnswerD', 'gtav-tourney-layouts', {
    defaultValue: false
  });

  const setPinkPick = useReplicant<string>('setsPinkPick', 'gtav-tourney-layouts', {
    defaultValue: ''
  });

  const setYellowPick = useReplicant<string>('setsYellowPick', 'gtav-tourney-layouts', {
    defaultValue: ''
  });

  const setPurplePick = useReplicant<string>('setsPurplePick', 'gtav-tourney-layouts', {
    defaultValue: ''
  });

  const setTealPick = useReplicant<string>('setsTealPick', 'gtav-tourney-layouts', {
    defaultValue: ''
  });

  nodecg.listenFor('showAnswerA', (show: boolean) => {
    showingAnswerA!.data = show;
  });

  nodecg.listenFor('showAnswerB', (show: boolean) => {
    showingAnswerB!.data = show;
  });

  nodecg.listenFor('showAnswerC', (show: boolean) => {
    showingAnswerC!.data = show;
  });

  nodecg.listenFor('showAnswerD', (show: boolean) => {
    showingAnswerD!.data = show;
  });

  nodecg.listenFor('correctAnswerA', (correct: boolean) => {
    setCorrectAnswerA!.data = correct;
  });

  nodecg.listenFor('correctAnswerB', (correct: boolean) => {
    setCorrectAnswerB!.data = correct;
  });

  nodecg.listenFor('correctAnswerC', (correct: boolean) => {
    setCorrectAnswerC!.data = correct;
  });

  nodecg.listenFor('correctAnswerD', (correct: boolean) => {
    setCorrectAnswerD!.data = correct;
  });

  nodecg.listenFor('pinkPicks', (answer: string) => {
      setPinkPick!.data = answer;
  });

  nodecg.listenFor('yellowPicks', (answer: string) => {
    setYellowPick!.data = answer;
  });

  nodecg.listenFor('purplePicks', (answer: string) => {
    setPurplePick!.data = answer;
  });

  nodecg.listenFor('tealPicks', (answer: string) => {
    setTealPick!.data = answer;
  });

  const questionSlide = ref<HTMLElement | null>(null);
  const answer1Slide = ref<HTMLElement | null>(null);
  const answer2Slide = ref<HTMLElement | null>(null);
  const answer3Slide = ref<HTMLElement | null>(null);
  const answer4Slide = ref<HTMLElement | null>(null);

  
  watch(() => currentQuestion?.data?.question, (newQuestion, oldQuestion) => {
  if (newQuestion !== oldQuestion && questionSlide.value) {
    questionSlide.value.classList.remove('animate__fadeInRightBig');
    
    void questionSlide.value.offsetWidth; 

    questionSlide.value.classList.add('animate__animated', 'animate__fadeInRightBig');
    
    questionSlide.value.addEventListener('animationend', () => {
      if (questionSlide.value) {
        questionSlide.value.classList.remove('animate__animated', 'animate__fadeInRightBig');
      }
    }, { once: true });

    showingAnswerA!.data = false;
    showingAnswerB!.data = false;
    showingAnswerC!.data = false;
    showingAnswerD!.data = false;
    setCorrectAnswerA!.data = false;
    setCorrectAnswerB!.data = false;
    setCorrectAnswerC!.data = false;
    setCorrectAnswerD!.data = false;
    setPinkPick!.data = '';
    setYellowPick!.data = '';
    setPurplePick!.data = '';
    setTealPick!.data = '';

  }
});

watch([showingAnswerA, setCorrectAnswerA], async () => {
  if (answer1Slide.value) {
    answer1Slide.value.classList.remove('animate__fadeInRightBig', 'animate__flash');
    await nextTick();
    answer1Slide.value.classList.add('animate__animated', 'animate__fadeInRightBig');
    answer1Slide.value.addEventListener('animationend', () => {
      answer1Slide.value?.classList.remove('animate__animated', 'animate__fadeInRightBig');
    }, { once: true });
  }

  if (setCorrectAnswerA?.data && answer1Slide.value) {
    answer1Slide.value.classList.remove('animate__fadeInRightBig', 'animate__flash');
    await nextTick();
    answer1Slide.value.classList.add('animate__animated', 'animate__flash');
    answer1Slide.value.addEventListener('animationend', () => {
      answer1Slide.value?.classList.remove('animate__animated', 'animate__flash');
    }, { once: true });
  }
});

watch([showingAnswerB, setCorrectAnswerB], async () => {
  if (answer2Slide.value) {
    answer2Slide.value.classList.remove('animate__fadeInRightBig');
    await nextTick();
    answer2Slide.value.classList.add('animate__animated', 'animate__fadeInRightBig');
    answer2Slide.value.addEventListener('animationend', () => {
      answer2Slide.value?.classList.remove('animate__animated', 'animate__fadeInRightBig');
    }, { once: true });
  }

  if (setCorrectAnswerB?.data && answer2Slide.value) {
    answer2Slide.value.classList.remove('animate__fadeInRightBig', 'animate__flash');
    await nextTick();
    answer2Slide.value.classList.add('animate__animated', 'animate__flash');
    answer2Slide.value.addEventListener('animationend', () => {
      answer1Slide.value?.classList.remove('animate__animated', 'animate__flash');
    }, { once: true });
  }
});

watch([showingAnswerC, setCorrectAnswerC], async () => {
  if (answer3Slide.value) {
    answer3Slide.value.classList.remove('animate__fadeInRightBig');
    await nextTick();
    answer3Slide.value.classList.add('animate__animated', 'animate__fadeInRightBig');
    answer3Slide.value.addEventListener('animationend', () => {
      answer3Slide.value?.classList.remove('animate__animated', 'animate__fadeInRightBig');
    }, { once: true });
  }

  if (setCorrectAnswerC?.data && answer3Slide.value) {
    answer3Slide.value.classList.remove('animate__fadeInRightBig', 'animate__flash');
    await nextTick();
    answer3Slide.value.classList.add('animate__animated', 'animate__flash');
    answer3Slide.value.addEventListener('animationend', () => {
      answer1Slide.value?.classList.remove('animate__animated', 'animate__flash');
    }, { once: true });
  }
});

watch([showingAnswerD, setCorrectAnswerD], async () => {
  if (answer4Slide.value) {
    answer4Slide.value.classList.remove('animate__fadeInRightBig');
    await nextTick();
    answer4Slide.value.classList.add('animate__animated', 'animate__fadeInRightBig');
    answer4Slide.value.addEventListener('animationend', () => {
      answer4Slide.value?.classList.remove('animate__animated', 'animate__fadeInRightBig');
    }, { once: true });
  }

  if (setCorrectAnswerD?.data && answer4Slide.value) {
    answer4Slide.value.classList.remove('animate__fadeInRightBig', 'animate__flash');
    await nextTick();
    answer4Slide.value.classList.add('animate__animated', 'animate__flash');
    answer4Slide.value.addEventListener('animationend', () => {
      answer1Slide.value?.classList.remove('animate__animated', 'animate__flash');
    }, { once: true });
  }
});

watch(
  () => setCorrectAnswerA?.data,
  (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
        window.nodecg.playSound('correct-answer', { updateVolume: true });
    }
  }
);

watch(
  () => setCorrectAnswerB?.data,
  (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
        window.nodecg.playSound('correct-answer', { updateVolume: true });
    }
  }
);

watch(
  () => setCorrectAnswerC?.data,
  (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
        window.nodecg.playSound('correct-answer', { updateVolume: true });
    }
  }
);

watch(
  () => setCorrectAnswerD?.data,
  (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
        window.nodecg.playSound('correct-answer', { updateVolume: true });
    }
  }
);

</script>

<style>
  @font-face {
    font-family: 'Europa Grotesk SH DemBol';
    src: url('../css/fonts/europa/EuropaGroteskSH-DemBol.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('../css/fonts/bebas/BebasNeue-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }

  /* Reset and layout for the container */
  #background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 0; /* Background image at the lowest level */
  }

  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Container with player sections and color overlays */
  #container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .movable {
    position: absolute;
    z-index: 3; /* Ensure it is above color overlays */
  }

  .player-section {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 3;
  }

  .player-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .player-avatar {
    width: 78px;
    height: 78px;
    object-fit: contain;
    z-index: 4;
  }

  /* Adjust avatar position for Players */
  .player-avatar1 { position:absolute; top: 188px; left: 21px; } 
  .player-avatar2 { position:absolute; top: 336px; left: 21px; }
  .player-avatar3 { position:absolute; top: 495px; left: 21px; }
  .player-avatar4 { position:absolute; top: 656px; left: 21px; } 

  .player-name {
    font-size: 66px;
    color: black;
    line-height: 0;
    font-family: 'Europa Grotesk SH DemBol';
    position: relative;
    z-index: 4; /* Ensure names are on top of color overlays */
  }

  /* Adjust name position for Players */
  .player-name1 { top: 159px; left: 124px; color: white } 
  .player-name2 { top: 309px; left: 124px; } 
  .player-name3 { top: 468px; left: 124px; color: white } 
  .player-name4 { top: 628px; left: 124px; } 

  .color-overlay {
    position: absolute;
    z-index: 2; /* Ensure color overlays are below player names but above the background */
  }

  .color-pink { top: 0px; left: 0px; }
  .color-yellow { top: 0px; left: 0px; }
  .color-purple { top: 0px; left: 0px; }
  .color-teal { top: 0px; left: 0px; }

  .timer {
    position: absolute;
    bottom: 780px;
    left: 386px;
    width: 100%;
    color: white;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 68px;
    z-index: 5; /* Ensure timer is above all player and color overlays */
  }

  .bottom-overlay {
    position: absolute;
    bottom: 0;
    z-index: 3; /* Ensure bottom overlay is above the background but below other elements */
  }

  .scores {
    position: absolute;
    bottom: 150px;
    width: 100%;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 65px;
    z-index: 5; /* Ensure scores are above all player and color overlays */
  }

  /* Adjust score styling */
  .score1 { position: relative; top: 583px; left: -50px; } 
  .score2 { position: relative; top: 433px; left: 188px; } 
  .score3 { position: relative; top: 283px; left: 426px; } 
  .score4 { position: relative; top: 133px; left: 664px; } 

  .score-names {
    position: absolute;
    bottom: 150px;
    width: 100%;
    font-family: "Bebas Neue";
    text-align: center;
    font-size: 30px;
    z-index: 5; /* Ensure scores are above all player and color overlays */
  }

  /* Adjust score styling */
  .score-name1 { position: relative; top: 327px; left: -50px; color: #ff1b62} 
  .score-name2 { position: relative; top: 257px; left: 188px; color: #ffde1b} 
  .score-name3 { position: relative; top: 187px; left: 428px; color: #9c39ff} 
  .score-name4 { position: relative; top: 117px; left: 664px; color: #00ff9d} 

  .question {
    position: absolute;
    z-index: 4;
  }

  .questionslide {
    position: absolute;
    z-index: 4;
  }

  .question-text{
    z-index: 6;
    font-family: "Bebas Neue";
    font-size: 50px;
    color: white;
    text-align: right;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    line-height: 1;
  }

  .questionbox{
    z-index: 5;
    width: 768px;
    height: 143px;
    top: 314px;
    left: 1135px;
    position:absolute;
    box-sizing: border-box;
    padding: 10px;
    overflow:visible;
  }

  .question-id{
    z-index: 6;
    font-family: "Bebas Neue";
    font-size: 88px;
    color: white;
    text-align: right;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    line-height: 1;
  }

  .questionamountbox{
    z-index: 5;
    width: 768px;
    height: 143px;
    top: 54px;
    left: 1117px;
    position:absolute;
    box-sizing: border-box;
    overflow:visible;
  }

  .answerslide {
    position: absolute;
    z-index: 4;
  }

  .answer-text{
    z-index: 6;
    font-family: "Bebas Neue";
    font-size: 37px;
    color: white;
    text-align: right;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    line-height: 1;
  }

  .answer-textALT{
    z-index: 6;
    font-family: "Bebas Neue";
    font-size: 37px;
    color: black;
    text-align: right;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    line-height: 1;
  }

  .answer1box{
    position:absolute;
    z-index: 5;
    width: 730px;
    height: 143px;
    top: 454px;
    left: 1135px;
    box-sizing: border-box;
    padding: 10px;
    overflow:visible;
  }

  .answer2box{
    position:absolute;
    z-index: 5;
    width: 730px;
    height: 143px;
    top: 614px;
    left: 1135px;
    box-sizing: border-box;
    padding: 10px;
    overflow:visible;
  }

  .answer3box{
    z-index: 5;
    width: 730px;
    height: 143px;
    top: 654px;
    left: 1135px;
    position:absolute;
    box-sizing: border-box;
    padding: 10px;
    overflow:visible;
  }

  .answer4box{
    z-index: 5;
    width: 730px;
    height: 143px;
    top: 754px;
    left: 1135px;
    position:absolute;
    box-sizing: border-box;
    padding: 10px;
    overflow:visible;
  }

</style>
