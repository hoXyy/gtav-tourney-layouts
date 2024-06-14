<template>
  <TopBar />

  <img src="./img/main.png" style="position: absolute" />

  <!-- Segment Bans -->
  <div
    id="trevisBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Trevor%')
    ">
    <img src="./img/ban/bantrevor.png" style="position: absolute" />
  </div>

  <div
    id="countrysideBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Countryside')
    ">
    <img src="./img/ban/bancountry.png" style="position: absolute" />
  </div>

  <div
    id="blitzBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Blitz Play')
    ">
    <img src="./img/ban/banblitz.png" style="position: absolute" />
  </div>

  <div
    id="deepinsideBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Deep Inside')
    ">
    <img src="./img/ban/bandeep.png" style="position: absolute" />
  </div>

  <div
    id="freshmeatBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Fresh Meat')
    ">
    <img src="./img/ban/banfresh.png" style="position: absolute" />
  </div>

  <div
    id="thirdwayBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'The Third Way')
    ">
    <img src="./img/ban/banttw.png" style="position: absolute" />
  </div>

  <div
    id="asjBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Stunt Jumps')
    ">
    <img src="./img/ban/banasj.png" style="position: absolute" />
  </div>

  <div
    id="racesBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'All Races')
    ">
    <img src="./img/ban/banraces.png" style="position: absolute" />
  </div>

  <div
    id="epsilonBan"
    v-if="
      segmentBans &&
      segmentBans.data &&
      segmentBans.data.find((segment) => segment.name === 'Epsilon Program')
    ">
    <img src="./img/ban/banepsilon.png" style="position: absolute" />
  </div>

  <!-- Player 1 Picks -->
  <div
    id="trevisYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Trevor%') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Trevor%')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowtrevor.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="countrysideYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Countryside') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Countryside')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowcountry.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="blitzYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Blitz Play') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Blitz Play')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowblitz.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="deepinsideYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Deep Inside') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Deep Inside')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowdeep.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="freshmeatYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Fresh Meat') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Fresh Meat')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowfresh.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="thirdwayYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'The Third Way') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'The Third Way')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowttw.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="asjYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowasj.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="racesYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Races') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'All Races')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowraces.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="epsilonYellowPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Epsilon Program') != undefined &&
      isPickedByPlayer1(segmentPicks.data.find((segment) => segment.name === 'Epsilon Program')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/yellow/pickyellowepsilon.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ffde1b">{{
              currentMatch?.data?.players.player1.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <!-- Player 2 Picks -->
  <div
    id="trevisPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Trevor%') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Trevor%')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinktrevor.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="countrysidePinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Countryside') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Countryside')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkcountry.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="blitzPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Blitz Play') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Blitz Play')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkblitz.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, -180px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="deepinsidePinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Deep Inside') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Deep Inside')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkdeep.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="freshmeatPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Fresh Meat') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Fresh Meat')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkfresh.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="thirdwayPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'The Third Way') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'The Third Way')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkttw.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, 29px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="asjPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkasj.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-705px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="racesPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'All Races') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'All Races')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkraces.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-490px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    id="epsilonPinkPick"
    v-if="
      segmentPicks &&
      segmentPicks.data &&
      segmentPicks.data.find((segment) => segment.name === 'Epsilon Program') != undefined &&
      isPickedByPlayer2(segmentPicks.data.find((segment) => segment.name === 'Epsilon Program')!)
    ">
    <div style="position: relative; text-align: center">
      <div style="position: absolute">
        <img src="./img/pick/pink/pickpinkepsilon.png" style="position: absolute" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
        <p
          style="
            font-family: 'Bebas Neue';
            font-size: 31px;
            position: relative;
            z-index: 2;
            top: 540px;
            height: 150px;
            line-height: 0px;
            text-align: center;
            transform: translate(-275px, 238px);
            margin: 0;
          ">
          PICKED BY
          <br />
          <span style="">
            <pre style="font-family: 'Bebas Neue'; font-size: 31px; color: #ff1b62">{{
              currentMatch?.data?.players.player2.name
            }}</pre>
          </span>
        </p>
      </div>
    </div>
  </div>

  <!-- Decider -->
  <div v-if="currentMatch && currentMatch.data && currentMatch.data.type !== 'bo1'">
    <div
      id="trevisDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Trevor%') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Trevor%')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/decidertrevor.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-705px, -180px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="countrysideDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Countryside') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Countryside')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/decidercountry.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-490px, -180px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="blitzDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Blitz Play') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Blitz Play')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderblitz.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-275px, -180px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="deepDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Deep Inside') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Deep Inside')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderdeep.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-705px, 29px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="freshDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Fresh Meat') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Fresh Meat')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderfresh.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-490px, 29px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="thirdwayDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'The Third Way') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'The Third Way')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderttw.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-275px, 29px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="asjDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'All Stunt Jumps')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderasj.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-705px, 238px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>

    <div
      id="racesDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'All Races') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'All Races')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderraces.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-490px, 238px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>
    <div
      id="epsilonDecider"
      v-if="
        segmentPicks &&
        segmentPicks.data &&
        segmentPicks.data.find((segment) => segment.name === 'Epsilon Program') != undefined &&
        isDecider(segmentPicks.data.find((segment) => segment.name === 'Epsilon Program')!)
      ">
      <div style="position: relative; text-align: center">
        <div style="position: absolute">
          <img src="./img/decider/deciderepsilon.png" style="position: absolute" />
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; text-align: center">
          <p
            style="
              font-family: 'Bebas Neue';
              font-size: 31px;
              position: relative;
              z-index: 2;
              top: 560px;
              height: 150px;
              line-height: 0px;
              text-align: center;
              transform: translate(-275px, 238px);
              margin: 0;
            ">
            DECIDER
          </p>
        </div>
      </div>
    </div>
  </div>

  <PlayerInfo />
  <MatchInfo />
  <Omnibar />
</template>

<script setup lang="ts">
  import MatchInfo from '../components/MatchInfo.vue';
  import TopBar from '../components/TopBar.vue';
  import Omnibar from '../components/Omnibar.vue';
  import { useReplicant } from 'nodecg-vue-composable';
  import PlayerInfo from './components/PlayerInfo.vue';
  import { CurrentMatch, CurrentSegment } from '@layouts/types';
  import { watch } from 'vue';

  const segmentPicks = useReplicant<CurrentSegment[]>('segmentPicks', 'gtav-tourney-layouts', {
    defaultValue: [],
  });
  const segmentBans = useReplicant<CurrentSegment[]>('segmentBans', 'gtav-tourney-layouts', {
    defaultValue: [],
  });

  const currentMatch = useReplicant<CurrentMatch>('currentMatch', 'gtav-tourney-layouts');

  function isPickedByPlayer1(segment: CurrentSegment) {
    if (currentMatch && currentMatch.data && segment.pickedBy) {
      return segment.pickedBy === currentMatch.data.players.player1.name;
    } else {
      return false;
    }
  }

  function isPickedByPlayer2(segment: CurrentSegment) {
    if (currentMatch && currentMatch.data && segment.pickedBy) {
      return segment.pickedBy === currentMatch.data.players.player2.name;
    } else {
      return false;
    }
  }

  function isDecider(segment: CurrentSegment) {
    if (currentMatch && currentMatch.data && segment.pickedBy) {
      return segment.pickedBy === 'Decider';
    } else {
      return false;
    }
  }

  watch(
    () => segmentPicks?.data,
    (newVal, oldVal) => {
      if (newVal != undefined) {
        if (oldVal != undefined) {
          if (newVal.length > oldVal.length) {
            nodecg.playSound('segment-pick', { updateVolume: true });
          }
        } else {
          nodecg.playSound('segment-pick', { updateVolume: true });
        }
      }
    }
  );

  watch(
    () => segmentBans?.data,
    (newVal, oldVal) => {
      if (newVal != undefined) {
        if (oldVal != undefined) {
          if (newVal.length > oldVal.length) {
            nodecg.playSound('segment-ban', { updateVolume: true });
          }
        } else {
          nodecg.playSound('segment-ban', { updateVolume: true });
        }
      }
    }
  );
</script>

<style>
  @import url('../css/base.css');
</style>
