import { ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { ActionTypeEnum } from './action-type.enum';

export interface Action<T> {
    type: ActionTypeEnum;
    href?: (record: T) => string;
    routerLink?: string[];
    routerQueryParams?: any;
    recordRouterLink?: (record: T) => string[];
    recordRouterQueryParams?: (record: T) => any;
    execute?: (records: T[]) => Observable<void>;
    classes: string[];
    badgeClasses: string[];

    state: ClrLoadingState;
}
