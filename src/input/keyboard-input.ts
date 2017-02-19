import Rx from 'rxjs';

export class KeyChange {
  constructor(public code: number, public down: boolean, public event: Event) {}
}

export interface IKeyActionMapFunction {
  (keyChange: KeyChange): any
}

export const KEYS = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  KEY_MINUS: 109,
  KEY_PLUS: 107
};

export const keyChanges: Rx.Observable<KeyChange> = Rx.Observable.merge(
  Rx.Observable
    .fromEvent(document, 'keydown')
    .map((event) => new KeyChange(event.keyCode, true, event)),
  Rx.Observable
    .fromEvent(document, 'keyup')
    .map((event) => new KeyChange(event.keyCode, false, event))
).distinctUntilChanged((a, b) => a.code === b.code && a.down === b.down);

export function subscribeKeyActionMap(keyActionMap: {[keyCode: number]: IKeyActionMapFunction}): Rx.Subscription {
  return keyChanges.subscribe((keyChange: KeyChange) => {
    if (keyChange.code in keyActionMap) {
      keyActionMap[keyChange.code](keyChange);
    }
  });
}
