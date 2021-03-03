import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface, ClrLoadingState } from '@clr/angular';
import { ActionTypeEnum } from '../action-type.enum';
import { ButtonBarAction } from '../button-bar-action.model';
import { ColumnDataVisualizationType } from '../column-data-visualization-type.enum';
import { Column } from '../column.model';
import { GridAction } from '../grid-action.model';
import { HasId } from '../has-id.model';

@Component({
    selector: 'adm-paged-list',
    templateUrl: './paged-list.component.html',
    styleUrls: ['./paged-list.component.css']
})
export class PagedListComponent<T extends HasId> implements OnInit {
    ColumnDataVisualizationType = ColumnDataVisualizationType;
    ClrDatagridSortOrder = ClrDatagridSortOrder;
    ActionTypeEnum = ActionTypeEnum;

    private firstEventIgnored = false;

    /**
     * Indicates is the data is loading or refreshing.
     */
    @Input() loading: ClrLoadingState = ClrLoadingState.DEFAULT;
    /**
     * Columns to build in the grid.
     */
    @Input() columns: Column<T>[] = [];
    /**
     * Actions to show inside the grid, with a dropdown on each line.
     */
    @Input() gridActions: GridAction<T>[] = [];
    /**
     * Actions to show on top of the grid, in the action bar.
     */
    @Input() buttonBarActions: ButtonBarAction<T>[] = [];
    /**
     * Slice of data records to show.
     */
    @Input() records: T[] = [];
    /**
     * Page size options the user can choose from.
     */
    @Input() pageSizeOptions = [5, 10, 15, 20, 50, 100];
    /**
     * Total amount of records. In case of server side paging, this is the amount of records on the server matching the filters.
     */
    @Input() total: number = 0;
    /**
     * Current selected page, starting at 0.
     */
    @Input() currentPage: number = 0;
    /**
     * The number of records in this page.
     */
    @Input() pageSize: number = 10;
    /**
     * The column to sort by.
     */
    @Input() sortColumn: string;
    /** 
     * The direction to sort by
     */
    @Input() sortDirection: ClrDatagridSortOrder;
    @Output() update = new EventEmitter<ClrDatagridStateInterface>();

    selectedRecords: T[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    propertyValue(column: Column<T>, record: T) {
        if (column.propertyExpression) {
            return column.propertyExpression(record);
        } else {
            return record[column.property];
        }
    }

    formatObject(column: Column<T>, label: any) {
        return column.subPropertyExpression(label);
    }

    refreshDataGrid(state: ClrDatagridStateInterface) {
        if (!this.firstEventIgnored) {
            this.firstEventIgnored = true;
        } else {
            console.info('grid state changed', state);
            this.update.next(state);
        }
    }
}
