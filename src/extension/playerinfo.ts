import axios from 'axios';
import imageToBase64 from 'image-to-base64';
import fetch from 'node-fetch';
import { getMimeType } from 'stream-mime-type';
import { msToTimeStr } from './util/helpers';
import { get } from './util/nodecg';
import { matches, playerPBs } from './util/replicants';

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

function getPlayerPB(srcUsername: string, category: string) {
    let pb = '--:--';
    axios
        .get(
            `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                srcUsername
            )}`
        )
        .then((res) => {
            let parsed = res.data;
            if (parsed.data.length > 0) {
                axios
                    .get(
                        `https://www.speedrun.com/api/v1/users/${parsed.data[0].id}/personal-bests`
                    )
                    .then((res) => {
                        parsed = res.data;
                        let x = null;
                        let nopb = false;
                        for (let i = 0; i < parsed.data.length; i++) {
                            x += parsed.data[i];
                            if (
                                parsed.data[i].run.category === '7kjvmgk3' &&
                                parsed.data[i].run.values.jlzwo90l ==
                                    segmentIDs[category]
                            ) {
                                nopb = false;
                                pb = msToTimeStr(
                                    parsed.data[i].run.times.realtime_t * 1000
                                );
                            } else if (nopb) {
                                pb = '--:--';
                            }
                        }
                    })
                    .catch((err) => {
                        nodecg.log.error(err);
                        pb = '--:--';
                    });
            }
        })
        .catch((err) => {
            nodecg.log.error(err);
            pb = '--:--';
        });
    return pb;
}

function getPlayerAvatar(srcUsername: string) {
    let avatarBase64 = '';
    axios
        .get(
            `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                srcUsername
            )}`
        )
        .then((res) => {
            let { data } = res;
            if (data.data.length > 0) {
                axios
                    .get(
                        `https://www.speedrun.com/api/v1/users/${data.data[0].id}`
                    )
                    .then(async (res) => {
                        data = res.data;
                        if (data.data.assets.image.uri != null) {
                            const base64 = await imageToBase64(
                                data.data.assets.image.uri
                            );
                            const mimeType = await getFileType(
                                data.data.assets.image.uri
                            );
                            const fullAvatar = `data:${mimeType};base64,${base64}`;
                            avatarBase64 = fullAvatar;
                        }
                    });
            }
        });

    return avatarBase64;
}

async function getFileType(url: string): Promise<string> {
    const response = await fetch(url);
    const { stream, mime } = await getMimeType(response.body!);
    return mime;
}

matches.on('change', () => {
    // Do this for every match
    for (let match of matches.value) {
        // Get players' avatar
        if (
            !match.players.player1.avatar &&
            match.players.player1.srcUsername
        ) {
            match.players.player1.avatar = getPlayerAvatar(
                match.players.player1.srcUsername
            );
        }

        if (
            !match.players.player2.avatar &&
            match.players.player2.srcUsername
        ) {
            match.players.player2.avatar = getPlayerAvatar(
                match.players.player2.srcUsername
            );
        }
    }
});
