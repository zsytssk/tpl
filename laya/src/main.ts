import GameConfig from './GameConfig';
import { res } from './res';
import { init } from './testUtil/init';
import {
    convertToObserver,
    loadRes,
    loadScene,
    mergeLoadingTask,
} from './testUtil/runScene';

async function main() {
    const version = Date.now() + '';

    await init(GameConfig, {
        defaultVersion: version,
        basePath: './',
    });

    const [, hall] = await mergeLoadingTask(
        [
            convertToObserver(loadRes)(res),
            convertToObserver(loadScene)('scene/hall.scene'),
        ],
        (radio) => {
            console.log(radio);
        },
    );

    console.log(`test:>`, hall);
    hall.open();
}

main();
