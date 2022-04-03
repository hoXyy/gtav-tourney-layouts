import {
    player1Rep,
    player2Rep,
    matchinfoRep,
    manualpb,
} from './util/replicants';
import { msToTimeStr } from './util/helpers';
import axios from 'axios';
import { get } from './util/nodecg';

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

player1Rep.on('change', async (newVal) => {
    if (!manualpb.value.player1) {
        let res = await axios.get(
            `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                newVal.src
            )}`
        );
        if (res.data.length > 0) {
            try {
                let pb_data = await axios.get(
                    `https://www.speedrun.com/api/v1/users/${res.data[0].id}/personal-bests`
                );
                player1Rep.value.pb = getPlayerPB(pb_data.data);
            } catch (err) {
                nodecg.log.error(err);
                player1Rep.value.pb = '--:--';
            }
        } else {
            player1Rep.value.pb = '--:--';
        }
    }
});

player2Rep.on('change', async (newVal) => {
    if (!manualpb.value.player2) {
        let res = await axios.get(
            `https://www.speedrun.com/api/v1/users?lookup=${encodeURIComponent(
                newVal.src
            )}`
        );
        if (res.data.length > 0) {
            let pb_data = await axios.get(
                `https://www.speedrun.com/api/v1/users/${res.data[0].id}/personal-bests`
            );
            player2Rep.value.pb = getPlayerPB(pb_data.data);
        } else {
            player2Rep.value.pb = '--:--';
        }
    }
});

/**
 * Gets player PB from speedrun.com for currently selected segment
 * @param data Player's PB data from speedrun.com
 */
function getPlayerPB(data: any): string {
    let pb_string = '';
    console.log(data);
    if (data) {
        let nopb = true;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].run.category);
            if (
                data[i].run.category === '7kjvmgk3' &&
                data[i].run.values.jlzwo90l ==
                    segmentIDs[matchinfoRep.value.segment]
            ) {
                const time = msToTimeStr(data[i].run.times.realtime_t * 1000);
                console.log('pb found');
                nopb = false;
                if (data[i].place % 10 === 1) {
                    pb_string = time + ` (` + data[i].place + `st)`;
                } else if (data[i].place % 10 === 2) {
                    pb_string = time + ` (` + data[i].place + `nd)`;
                } else if (data[i].place % 10 === 3) {
                    pb_string = time + ` (` + data[i].place + `rd)`;
                } else {
                    pb_string = time + ` (` + data[i].place + `th)`;
                }
            } else if (nopb) {
                pb_string = '--:--';
            } else {
                pb_string = '--:--';
            }
        }
        pb_string = '--:--';
    } else {
        pb_string = '--:--';
    }
    return pb_string;
}
