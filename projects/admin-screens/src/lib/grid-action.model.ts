import { Action } from './action.model';

export interface GridAction<T> extends Action<T> {
    label: (record: T) => string;
    href?: (record: T) => string;
    routerLink?: (record: T) => string[];
}
