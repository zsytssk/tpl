import { Scene } from 'laya/display/Scene';
import { Handler } from 'laya/utils/Handler';

type Ctor<T> = new (...args) => T;
export interface LoadingView {
    onShow: () => void;
    onHide: () => void;
    onProgress: (radio: number) => void;
}
export type LoadingCtor = Ctor<LoadingView> & {
    load: () => Promise<LoadingView>;
    instance: LoadingView;
    isLoadingView: boolean;
};

export async function runScene(
    url: string,
    progress?: (radio: number) => void,
) {
    return new Promise((resolve) => {
        Scene.load(
            url,
            Handler.create(
                this,
                (scene) => {
                    resolve(scene);
                },
                null,
                true,
            ),
            Handler.create(
                this,
                (radio) => {
                    progress?.(radio);
                },
                null,
                false,
            ),
        );
    });
}

export function mergeLoadingTask(loadingProcess: any[]) {}
