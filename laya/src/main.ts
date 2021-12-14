import { Scene } from 'laya/display/Scene';

import GameConfig from './GameConfig';
import { init } from './testUtil/init';
import { runScene } from './testUtil/runScene';
import Loading from './view/loading';

async function main() {
    const version = Date.now() + '';
    await init(GameConfig, {
        defaultVersion: version,
        basePath: './',
    });

    const [progressPipe, loadPromise] = runScene('scene/hall.scene');
}

main();
