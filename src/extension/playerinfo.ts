import {
    player1Rep,
    player2Rep,
    matchinfoRep,
    manualpb,
} from './util/replicants';
import { msToTimeStr } from './util/helpers';
import axios from 'axios';
import { get } from './util/nodecg';
import imageToBase64 from 'image-to-base64';
import fetch from 'node-fetch';
import { getMimeType } from 'stream-mime-type';

let pb1_string = null;
let pb2_string = null;

const nodecg = get();

const segmentIDs: { [key: string]: string } = {
    'Trevor%': '814344kq',
    Countryside: 'z197dd4l',
    'Blitz Play': 'p123442l',
    'Deep Inside': '81p866nl',
    'Paleto Score': 'jqzkyykq',
    'Fresh Meat': 'xqk7664l',
    'Bureau Raid': 'gq7kzzr1',
    'The Third Way': '21gyooo1',
};

function updatePlayer1PB(): void {
    if (!manualpb.value.player1) {
        axios
            .get(
                `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                    player1Rep.value.src
                )}`
            )
            .then((res) => {
                let parsed = res.data;
                if (parsed.data.length > 0) {
                    axios
                        .get(
                            `https://www.speedrun.com/api/v1/users/` +
                                parsed.data[0].id +
                                `/personal-bests`
                        )
                        .then((res) => {
                            parsed = res.data;
                            let x = null;
                            let nopb = false;
                            for (let i = 0; i < parsed.data.length; i++) {
                                x += parsed.data[i];
                                if (
                                    parsed.data[i].run.category ===
                                        '7kjvmgk3' &&
                                    parsed.data[i].run.values.jlzwo90l ==
                                        segmentIDs[matchinfoRep.value.segment]
                                ) {
                                    var time = msToTimeStr(
                                        parsed.data[i].run.times.realtime_t *
                                            1000
                                    );
                                    nopb = false;
                                    if (parsed.data[i].place % 10 === 1) {
                                        pb1_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `st)`;
                                    } else if (
                                        parsed.data[i].place % 10 ===
                                        2
                                    ) {
                                        pb1_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `nd)`;
                                    } else if (
                                        parsed.data[i].place % 10 ===
                                        3
                                    ) {
                                        pb1_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `rd)`;
                                    } else {
                                        pb1_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `th)`;
                                    }
                                    player1Rep.value.pb = pb1_string;
                                } else if (nopb) {
                                    player1Rep.value.pb = '--:--';
                                }
                            }
                        })
                        .catch((err) => {
                            nodecg.log.error(err);
                        });
                }
            })
            .catch((err) => {
                nodecg.log.error(err);
            });
    }
}

function updatePlayer2PB(): void {
    if (!manualpb.value.player2) {
        axios
            .get(
                `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                    player2Rep.value.src
                )}`
            )
            .then((res) => {
                let parsed = res.data;
                if (parsed.data.length > 0) {
                    axios
                        .get(
                            `https://www.speedrun.com/api/v1/users/` +
                                parsed.data[0].id +
                                `/personal-bests`
                        )
                        .then((res) => {
                            parsed = res.data;
                            let x = null;
                            let nopb = false;
                            for (let i = 0; i < parsed.data.length; i++) {
                                x += parsed.data[i];
                                if (
                                    parsed.data[i].run.category ===
                                        '7kjvmgk3' &&
                                    parsed.data[i].run.values.jlzwo90l ==
                                        segmentIDs[matchinfoRep.value.segment]
                                ) {
                                    var time = msToTimeStr(
                                        parsed.data[i].run.times.realtime_t *
                                            1000
                                    );
                                    nopb = false;
                                    if (parsed.data[i].place % 10 === 1) {
                                        pb2_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `st)`;
                                    } else if (
                                        parsed.data[i].place % 10 ===
                                        2
                                    ) {
                                        pb2_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `nd)`;
                                    } else if (
                                        parsed.data[i].place % 10 ===
                                        3
                                    ) {
                                        pb2_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `rd)`;
                                    } else {
                                        pb2_string =
                                            time +
                                            ` (` +
                                            parsed.data[i].place +
                                            `th)`;
                                    }
                                    player2Rep.value.pb = pb2_string;
                                } else if (nopb) {
                                    player2Rep.value.pb = '--:--';
                                }
                            }
                        })
                        .catch((err) => {
                            nodecg.log.error(err);
                        });
                }
            })
            .catch((err) => {
                nodecg.log.error(err);
            });
    }
}

function getPlayer1Avatar(): void {
    if (player1Rep.value.src) {
        axios
            .get(
                `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                    player1Rep.value.src
                )}`
            )
            .then((res) => {
                let data = res.data;
                if (data.data.length > 0) {
                    axios
                        .get(
                            `https://www.speedrun.com/api/v1/users/${data.data[0].id}`
                        )
                        .then(async (res) => {
                            data = res.data;
                            if (data.data.assets.image.uri != null) {
                                player1Rep.value.hasAvatar = true;
                                const avatarBase64 = await imageToBase64(
                                    data.data.assets.image.uri
                                );
                                const mimeType = await getFileType(
                                    data.data.assets.image.uri
                                );
                                let fullAvatar = `data:${mimeType};base64,${avatarBase64}`;
                                player1Rep.value.avatar = fullAvatar;
                            } else {
                                player1Rep.value.hasAvatar = false;
                                player1Rep.value.avatar = '';
                            }
                        });
                }
            });
    }
}

function getPlayer2Avatar(): void {
    if (player2Rep.value.src) {
        axios
            .get(
                `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                    player2Rep.value.src
                )}`
            )
            .then((res) => {
                let data = res.data;
                if (data.data.length > 0) {
                    axios
                        .get(
                            `https://www.speedrun.com/api/v1/users/${data.data[0].id}`
                        )
                        .then(async (res) => {
                            data = res.data;
                            if (data.data.assets.image.uri != null) {
                                player2Rep.value.hasAvatar = true;
                                const avatarBase64 = await imageToBase64(
                                    data.data.assets.image.uri
                                );
                                const mimeType = await getFileType(
                                    data.data.assets.image.uri
                                );
                                let fullAvatar = `data:${mimeType};base64,${avatarBase64}`;
                                player2Rep.value.avatar = fullAvatar;
                            } else {
                                player2Rep.value.hasAvatar = false;
                                player2Rep.value.avatar = '';
                            }
                        });
                }
            });
    }
}

async function getFileType(url: string): Promise<string> {
    const response = await fetch(url);
    const { stream, mime } = await getMimeType(response.body);
    return mime;
}

player1Rep.on('change', () => {
    updatePlayer1PB();
    getPlayer1Avatar();
});

player2Rep.on('change', () => {
    updatePlayer2PB();
    getPlayer2Avatar();
});

matchinfoRep.on('change', () => {
    updatePlayer1PB();
    updatePlayer2PB();
});
