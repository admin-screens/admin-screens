import { Action } from './action.model';

export interface ButtonBarAction<T> extends Action<T> {
    label: string;
    icon?: string;
    multiSelect: boolean;
}
