import honor from 'honor';
import {
    fakeLoad,
    loadRes,
    loadScene,
    mergeProgressObserver,
    toProgressObserver,
} from 'honor/utils/loadRes';

import GameConfig from './GameConfig';
import { res } from './res';
import Loading from './view/loading';

async function main() {
    const version = Date.now() + '';

    await honor.run(GameConfig, {
        defaultVersion: version,
        basePath: './',
    });

    const [hall] = await mergeProgressObserver(
        [
            toProgressObserver(loadScene)('scene/hall.scene'),
            toProgressObserver(loadRes)(res),
            toProgressObserver(fakeLoad)(10),
        ],
        Loading,
    );

    (hall as any).open();
}

main();
