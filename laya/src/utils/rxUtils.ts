import { filter, map } from 'rxjs/operators';

import { fromEvent, Subscriber, Observable } from 'rxjs';

import { Sprite } from 'laya/display/Sprite';

export function onKeyBoardEvent(code: number) {
    return fromEvent(document.body, 'keydown').pipe(
        filter((e: KeyboardEvent) => e.keyCode === code),
        map((e) => {
            e.preventDefault();
            return e;
        }),
    );
}
export function onNodeEvent(node: Sprite, event: string, once?: boolean) {
    const observer = new Observable((subscriber: Subscriber<Event>) => {
        const fn = (_event: Event) => {
            _event.stopPropagation();
            /** 按钮置灰 */
            subscriber.next(_event);
            if (once) {
                subscriber.complete();
            }
        };
        node.on(event, node, fn);
        subscriber.add(() => {
            node.off(event, node, fn);
        });
    });

    return observer;
}
