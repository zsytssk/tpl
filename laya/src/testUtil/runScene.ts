import { Observable, Subscriber } from 'rxjs';

import { loader } from 'Laya';
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

type LoadingProgress = [Observable<number>, Promise<any>];
export function runScene(url: string): [Observable<number>, Promise<Scene>] {
    let resolve: (value: Scene | PromiseLike<Scene>) => void;
    let subscriber: Subscriber<number>;
    const promise = new Promise<Scene>((_resolve) => {
        resolve = _resolve;
    });

    const observer = new Observable((_subscriber: Subscriber<number>) => {
        subscriber = _subscriber;
    });

    Scene.load(
        url,
        Handler.create(
            this,
            (scene) => {
                resolve(scene);
                subscriber.complete();
            },
            null,
            true,
        ),
        Handler.create(
            this,
            (radio) => {
                subscriber.next(radio);
            },
            null,
            false,
        ),
    );

    return [observer, promise];
}

export function loadRes(res: any[]): [Observable<number>, Promise<void>] {
    let resolve: () => void;
    let subscriber: Subscriber<number>;
    const promise = new Promise<void>((_resolve) => {
        resolve = _resolve;
    });

    const observer = new Observable((_subscriber: Subscriber<number>) => {
        subscriber = _subscriber;
    });

    loader.load(
        res,
        new Handler(
            null,
            () => {
                subscriber.complete();
                resolve();
            },
            null,
            false,
        ),
        new Handler(this, (val) => {
            subscriber.next(val);
        }),
    );

    return [observer, promise];
}

export function mergeLoadingTask(loadingProcess: LoadingProgress[]) {
    const observerArr = [];
    const promiseArr = [];
}
