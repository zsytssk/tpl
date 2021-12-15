import { loadDialog } from '@app/testUtil/runScene';
import { ui } from '@app/ui/layaMaxUI';

export default class Loading extends ui.scene.loadingUI {
    public static instance: Loading;
    public static isLoadingView = true;
    public static url = 'scene/loading.scene';
    public static async load() {
        if (Loading.instance) {
            return Loading.instance;
        }
        return (Loading.instance = (await loadDialog(Loading.url)) as Loading);
    }

    constructor() {
        super();
        this.popupEffect = undefined;
        this.closeEffect = undefined;
    }

    public onShow() {
        this.open(false);
    }

    public onHide() {
        this.close();
    }

    public onProgress(val: number) {
        console.log(`test:>`, val);
        this.progress.text = Math.floor(val * 100) + '%';
    }
}
