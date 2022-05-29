import { get as nodecg } from './util/nodecg';
import { Configschema } from '@layouts/types/schemas';
import OBSWebSocket from 'obs-websocket-js';
import { connectedToOBS } from './util/replicants';

const obs = new OBSWebSocket();
const config = (nodecg().bundleConfig as Configschema).obs;
let reconnectTimeout: NodeJS.Timeout;

if (config.enabled) {
    nodecg().log.info('[OBS] Attempting to connect to OBS...');
    obs.connect({ address: config.address, password: config.password }).catch(
        (err) => {
            nodecg().log.error(
                `[OBS] Failed to connect to OBS! Reason: ${err.error}`
            );
        }
    );
}

function reconnectToOBS() {
    clearTimeout(reconnectTimeout);
    if (!connectedToOBS.value && config.enabled) {
        nodecg().log.info('[OBS] Attempting to connect to OBS...');
        obs.connect({
            address: config.address,
            password: config.password,
        }).catch((err) => {
            nodecg().log.error(
                `[OBS] Failed to connect to OBS! Reason: ${err.error}`
            );
            reconnectTimeout = setTimeout(reconnectToOBS, 5000);
        });
    }
}

function updateBrowserSourceUrl(source: string, twitch: string) {
    if (source && twitch) {
        const url = `https://player.twitch.tv/?channel=${twitch.toLowerCase()}&enableExtensions=false&muted=false&player=popout&volume=1&parent=twitch.tv`;
        obs.send('SetSourceSettings', {
            sourceName: source,
            sourceType: 'browser_source',
            sourceSettings: { url: url },
        }).catch((err) => {
            nodecg().log.warn("[OBS] Couldn't update feed", err)
        });
    }
}

obs.on('ConnectionOpened', () => {
    nodecg().log.info('[OBS] Connected!');
    connectedToOBS.value = true;
});

obs.on('ConnectionClosed', () => {
    nodecg().log.info(
        '[OBS] Disconnected! Attempting to reconnect in 5 seconds...'
    );
    setTimeout(reconnectToOBS, 5000);
    connectedToOBS.value = false;
});

nodecg().listenFor('updatePlayer1Feed', (twitch: string) => {
    updateBrowserSourceUrl(config.feed1, twitch);
})

nodecg().listenFor('updatePlayer2Feed', (twitch: string) => {
    updateBrowserSourceUrl(config.feed2, twitch);
})
