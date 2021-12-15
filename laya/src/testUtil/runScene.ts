import { Observable, Subscriber, from } from 'rxjs';
import { concatAll } from 'rxjs/operators';

import { loader } from 'Laya';
import { Scene } from 'laya/display/Scene';
import { Dialog } from 'laya/ui/Dialog';
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

type ProgressFn = (radio: number) => void;
type LoadFn = (res: unknown, progressFn: ProgressFn) => Promise<unknown>;

export function loadScene(
    url: string,

    fn?: ProgressFn,
) {
    return new Promise<Scene>((resolve) => {
        Scene.load(
            url,
            Handler.create(this, resolve, null, true),
            Handler.create(this, fn, null, false),
        );
    });
}
export function loadDialog(url: string, fn?: ProgressFn) {
    return new Promise<Scene>((resolve) => {
        Dialog.load(
            url,
            Handler.create(this, resolve, null, true),
            Handler.create(this, fn, null, false),
        );
    });
}

export function loadRes(
    res: Parameters<typeof loader.load>[0],
    fn?: ProgressFn,
) {
    return new Promise<void>((resolve) => {
        loader.load(
            res,
            new Handler(null, resolve, null, false),
            new Handler(this, fn),
        );
    });
}

type LoadingProgress = [Observable<number>, Promise<unknown>];
export function convertToObserver(fn: LoadFn) {
    return function (
        res: Parameters<typeof fn>[0],
    ): [Observable<number>, Promise<unknown>] {
        let subscriber: Subscriber<number>;
        const observer = new Observable((_subscriber: Subscriber<number>) => {
            subscriber = _subscriber;
        });
        const promise = fn(res, (radio: number) => {
            subscriber?.next(radio);
        });
        promise.then(() => {
            subscriber?.complete();
        });

        return [observer, promise];
    };
}

export function mergeLoadingTask(
    loadingProcess: LoadingProgress[],
    progress?: ProgressFn,
) {
    const observerArr: Observable<number>[] = [];
    const promiseArr = [];
    for (const item of loadingProcess) {
        const [progressPipe, completePromise] = item;
        observerArr.push(progressPipe);
        promiseArr.push(completePromise);
    }
    const mergeProgress = from(observerArr).pipe(concatAll());

    if (progress) {
        mergeProgress.subscribe(progress);
    }

    return Promise.all(promiseArr);
}
