import {
    player1Rep,
    player2Rep,
    matchinfoRep,
    manualpb,
} from './util/replicants';
import { msToTimeStr } from './util/helpers';
import axios from 'axios';
import { get } from './util/nodecg';

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
                                    console.log;
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
                                    console.log;
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

player1Rep.on('change', () => {
    updatePlayer1PB();
});

player2Rep.on('change', () => {
    updatePlayer2PB();
});

matchinfoRep.on('change', () => {
    updatePlayer1PB();
    setTimeout(() => {
        updatePlayer2PB();
    }, 500);
});
