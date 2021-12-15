import GameConfig from './GameConfig';
import { res } from './res';
import { init } from './testUtil/init';
import {
    convertToObserver,
    loadRes,
    loadScene,
    mergeLoadingTask,
    testLoad,
} from './testUtil/runScene';
import Loading from './view/loading';

async function main() {
    const version = Date.now() + '';

    await init(GameConfig, {
        defaultVersion: version,
        basePath: './',
    });

    const [hall] = await mergeLoadingTask(
        [
            convertToObserver(loadScene)('scene/hall.scene'),
            convertToObserver(loadRes)(res),
            convertToObserver(testLoad)(10),
        ],
        Loading,
    );

    hall.open();
}

main();
