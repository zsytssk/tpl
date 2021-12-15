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

export function testLoad(time: number, fn?: ProgressFn) {
    return new Promise<void>((resolve) => {
        let space = 0;

        const interval = setInterval(() => {
            space += 0.5;
            if (space > time) {
                clearInterval(interval);
                resolve();
                return;
            }
            fn(space / time);
        }, 500);
    });
}

type LoadingProgress = [Observable<number>, Promise<unknown>];
export function convertToObserver(fn: LoadFn) {
    return function (
        res: Parameters<typeof fn>[0],
    ): [Observable<number>, Promise<unknown>] {
        let subscriber: Subscriber<number>;
        let resolve: (value: unknown) => void;
        const promise = new Promise((_resolve) => {
            resolve = _resolve;
        });
        const observer = new Observable((_subscriber: Subscriber<number>) => {
            subscriber = _subscriber;
            fn(res, (radio: number) => {
                subscriber?.next(radio);
            }).then((data) => {
                subscriber?.next(1);
                subscriber?.complete();
                resolve(data);
            });
        });

        return [observer, promise];
    };
}

export async function mergeLoadingTask(
    loadingProcess: LoadingProgress[],
    progress?: ProgressFn | LoadingCtor,
) {
    const observerArr: Observable<number>[] = [];
    const promiseArr = [];
    for (const item of loadingProcess) {
        const [progressPipe, completePromise] = item;
        observerArr.push(progressPipe);
        promiseArr.push(completePromise);
    }
    const mergeProgress = from(observerArr).pipe(concatAll());
    const allLoadCompleted = Promise.all(promiseArr);
    if ((progress as LoadingCtor)?.isLoadingView) {
        const loadingCtor = progress as LoadingCtor;
        const instance = await loadingCtor.load();
        instance.onShow();
        mergeProgress.subscribe((radio) => instance.onProgress(radio));
        allLoadCompleted.then(() => {
            instance.onHide();
        });
    } else if (typeof progress === 'function') {
        mergeProgress.subscribe(progress);
    } else {
        mergeProgress.subscribe();
    }

    return allLoadCompleted;
}
