import { CrudDataProvider } from './crud-data-provider.base';
import { FilterModel } from './filter.model';
import { HasId } from './has-id.model';
import { EntityLoader } from './entity-loader.interface';
import { BehaviorSubject } from 'rxjs';
import { SortDefinition } from './sort-definition.model';
import { ClrDatagridSortOrder, ClrDatagridStateInterface, ClrLoadingState } from '@clr/angular';
import { Injectable } from '@angular/core';


@Injectable()
export class EntityLoaderBase<T extends HasId, TFilter extends FilterModel>
    implements EntityLoader<T, TFilter> {

    loadingState = ClrLoadingState.DEFAULT;
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
        this.loadingState = ClrLoadingState.LOADING;
        this.dataProvider.search({
            sort: sort,
            skip: skip,
            take: take,
            filter: filter
        }).subscribe(page => {
            this.records.next(page.data);
            this.totalRecords.next(page.total);
            this.totalPages.next(Math.ceil(page.total / this.pageSize.value));
            this.loadingState = ClrLoadingState.SUCCESS;
        }, () => {
            this.loadingState = ClrLoadingState.ERROR;
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

    update(state: ClrDatagridStateInterface) {
        this.page.next(state.page.current);
        this.pageSize.next(state.page.size);

        if (state.sort) {
            this.sort.next({
                column: state.sort.by,
                direction: state.sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC
            });
        }
        this.reload();
    }
}
