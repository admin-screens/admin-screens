import { ClrDatagridSortOrder } from '@clr/angular';

export interface PageSelection {
    page: number;
    pageSize: number;
    sortColumn: string;
    sortDirection: ClrDatagridSortOrder;
}
