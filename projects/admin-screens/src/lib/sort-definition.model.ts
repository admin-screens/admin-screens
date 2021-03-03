import { ClrDatagridSortOrder } from '@clr/angular';

export interface SortDefinition {
    column: string;
    direction: ClrDatagridSortOrder;
}
