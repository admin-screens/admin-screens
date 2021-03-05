import { CrudDataProvider } from './crud-data-provider.base';
import { FilterModel } from './filter.model';
import { HasId } from './has-id.model';
import { EntityLoader } from './entity-loader.interface';
import { BehaviorSubject } from 'rxjs';
import { SortDefinition } from './sort-definition.model';
import { ClrLoadingState } from '@clr/angular';
import { Injectable } from '@angular/core';
import { PageSelection } from './paged-list/page-selection.model';


@Injectable()
export class EntityLoaderBase<T extends HasId, TFilter extends FilterModel>
    implements EntityLoader<T, TFilter> {

    loadingState = new BehaviorSubject(ClrLoadingState.DEFAULT);
    totalRecords = new BehaviorSubject(0);
    totalPages = new BehaviorSubject(0);

    sort = new BehaviorSubject(null);
    page = new BehaviorSubject(0);
    pageSize = new BehaviorSubject(10);
    filter = new BehaviorSubject(null);
    records = new BehaviorSubject([]);

    constructor(
        private dataProvider: CrudDataProvider<T, TFilter>
    ) { }

    protected reload() {
        this.loadPage(this.sort.value, this.page.value * this.pageSize.value, this.pageSize.value, this.filter.value);
    }

    protected loadPage(sort: SortDefinition, skip: number, take: number, filter: TFilter) {
        this.loadingState.next(ClrLoadingState.LOADING);
        this.dataProvider.search({
            sort: sort,
            skip: skip,
            take: take,
            filter: filter
        }).subscribe(page => {
            this.records.next(page.data);
            this.totalRecords.next(page.total);
            this.totalPages.next(Math.ceil(page.total / this.pageSize.value));
            this.loadingState.next(ClrLoadingState.SUCCESS);
        }, () => {
            this.loadingState.next(ClrLoadingState.ERROR);
        })
    }

    updateFilter(filter: TFilter) {
        this.filter.next(filter);
        this.reload();
    }

    updatePage(page: number) {
        this.page.next(page);
        this.reload();
    }

    updatePageSize(pageSize: number) {
        this.pageSize.next(pageSize);
        this.reload();
    }

    updateSort(sort: SortDefinition) {
        this.sort.next(sort);
        this.reload();
    }

    update(state: PageSelection) {
        this.page.next(state.page);
        this.pageSize.next(state.pageSize);

        if (state.sortColumn) {
            this.sort.next({
                column: state.sortColumn,
                direction: state.sortDirection
            });
        }
        this.reload();
    }
}
