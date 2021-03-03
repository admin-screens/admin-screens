import { ActionTypeEnum } from './action-type.enum';

export interface Action<T> {
    type: ActionTypeEnum;
    href?: (record: T) => string;
    routerLink?: (record: T) => string[];
    routerQueryParams?: (record: T) => any;
    execute?: (records: T[]) => void;
}
