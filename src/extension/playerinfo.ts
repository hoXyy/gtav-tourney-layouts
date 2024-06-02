import axios from 'axios';
import imageToBase64 from 'image-to-base64';
import fetch from 'node-fetch';
import { getMimeType } from 'stream-mime-type';
import { msToTimeStr } from './util/helpers';
import { get } from './util/nodecg';
import { currentMatch, currentSegment, manualPb, matches, playerPBs } from './util/replicants';

const nodecg = get();

const segmentIDs: { [key: string]: string } = {
  'Trevor%': '814344kq',
  Countryside: 'z197dd4l',
  'Blitz Play': 'p123442l',
  'Deep Inside': '81p866nl',
  'Fresh Meat': 'xqk7664l',
  'The Third Way': '21gyooo1',
};

const categoryIDs: { [key: string]: string } = {
  'All Stunt Jumps': '9d8vge6k',
  'All Races': 'w205pr5d',
  'Epsilon Program': 'rklzx7n2',
};

// Reset the PB variables on launch
playerPBs.value.player1 = '';
playerPBs.value.player2 = '';

async function getPlayerPB(srcUsername: string, category: string) {
  let pb = '--:--';
  try {
    const userList = (
      await axios.get(
        `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(srcUsername)}`
      )
    ).data;
    if (userList.data.length > 0) {
      const userData = (
        await axios.get(
          `https://www.speedrun.com/api/v1/users/${userList.data[0].id}/personal-bests`
        )
      ).data;
      let x = null;
      let nopb = false;
      for (let i = 0; i < userData.data.length; i++) {
        x += userData.data[i];
        if (Object.keys(segmentIDs).includes(category)) {
          if (
            userData.data[i].run.category === '7kjvmgk3' &&
            userData.data[i].run.values.jlzwo90l == segmentIDs[category]
          ) {
            nopb = false;
            pb = msToTimeStr(userData.data[i].run.times.realtime_t * 1000);
          } else if (nopb) {
            pb = '--:--';
          }
        } else {
          if (userData.data[i].run.category == categoryIDs[category]) {
            nopb = false;
            pb = msToTimeStr(userData.data[i].run.times.realtime_t * 1000);
          } else if (nopb) {
            pb = '--:--';
          }
        }
      }
    }
  } catch (err: any) {
    nodecg.log.error(`Error getting PB for ${srcUsername}: `, err);
  }

  return pb;
}

async function getPlayerAvatar(srcUsername: string) {
  let avatarBase64 = '';
  try {
    let userData = await axios.get(
      `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(srcUsername)}`
    );
    if (userData.data.data.length > 0) {
      let userId = userData.data.data[0].id;
      const user = (await axios.get(`https://www.speedrun.com/api/v1/users/${userId}`)).data;
      if (user.data.assets.image.uri != null) {
        const base64 = await imageToBase64(user.data.assets.image.uri);
        const mimeType = await getFileType(user.data.assets.image.uri);
        avatarBase64 = `data:${mimeType};base64,${base64}`;
      }
    }
  } catch (err: any) {
    nodecg.log.error(`Error getting avatar for ${srcUsername}: `, err);
  }

  return avatarBase64;
}

async function getFileType(url: string): Promise<string> {
  const response = await fetch(url);
  const { stream, mime } = await getMimeType(response.body!);
  return mime;
}

matches.on('change', async () => {
  // Do this for every match
  for (let match of matches.value) {
    // Get players' avatar
    if (!match.players.player1.avatar && match.players.player1.srcUsername) {
      const avatar = await getPlayerAvatar(match.players.player1.srcUsername);
      match.players.player1.avatar = avatar;
    }

    if (!match.players.player2.avatar && match.players.player2.srcUsername) {
      const avatar = await getPlayerAvatar(match.players.player2.srcUsername);
      match.players.player2.avatar = avatar;
    }
  }
});

currentSegment.on('change', async (val) => {
  if (val && val.name) {
    if (currentMatch.value) {
      if (!manualPb.value.player1) {
        if (currentMatch.value.players.player1.srcUsername) {
          const pb = await getPlayerPB(currentMatch.value.players.player1.srcUsername, val.name);
          playerPBs.value.player1 = pb;
        }
      }

      if (!manualPb.value.player2) {
        if (currentMatch.value.players.player2.srcUsername) {
          const pb = await getPlayerPB(currentMatch.value.players.player2.srcUsername, val.name);
          playerPBs.value.player2 = pb;
        }
      }
    }
  } else {
    playerPBs.value.player1 = '';
    playerPBs.value.player2 = '';
  }
});
