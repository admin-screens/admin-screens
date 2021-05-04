import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClrDatagridSortOrder } from '@clr/angular';
import { Subscription } from 'rxjs';
import { CrudDataProvider } from './crud-data-provider.base';
import { EntityLoaderBase } from './entity-loader.base';
import { FilterModel } from './filter.model';
import { HasId } from './has-id.model';
import { PageSelection } from './paged-list/page-selection.model';
import { SortDefinition } from './sort-definition.model';

@Injectable()
export class RouteStateEntityLoader<T extends HasId, TFilter extends FilterModel>
    extends EntityLoaderBase<T, TFilter> implements OnDestroy {

    private filterPrefix = 'filter.';
    private routeSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        crudDataProvider: CrudDataProvider<T, TFilter>
    ) {
        super(crudDataProvider);
        this.init();
    }

    init(): void {
        this.routeSubscription = this.activatedRoute.queryParams.subscribe(
            p => this.updateFromParams(p)
        );
    }

    ngOnDestroy(): void {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }

    updateFromParams(p: Params): void {
        let shouldReload = false;
        if ('page' in p) {
            const page = parseInt(p.page, 10);
            if (page !== this.page.value) {
                shouldReload = true;
                this.page.next(page);
            }
        }
        if ('pageSize' in p) {
            const pageSize = parseInt(p.page, 10);
            if (pageSize !== this.pageSize.value) {
                shouldReload = true;
                this.pageSize.next(pageSize);
            }
        }
        if ('sortColumn' in p || 'sortDirection' in p) {
            const sort: SortDefinition = {
                column: 'sortColumn' in p ? p.sortColumn : null,
                direction: 'sortDirection' in p ? parseInt(p.sortDirection, 10) : ClrDatagridSortOrder.UNSORTED
            };
            if (sort.column !== this.sort.value?.column ||
                sort.direction !== this.sort.value?.direction) {
                shouldReload = true;
                this.sort.next(sort);
            }
        } else if (this.sort.value !== null) {
            shouldReload = true;
            this.sort.next(null);
        }

        let filterChanged = false;
        const filter = this.filter.value;
        const newFilter = {};
        for (const key in p) {
            if (Object.prototype.hasOwnProperty.call(p, key) && key.startsWith(this.filterPrefix)) {
                const element = p[key];
                const filterKey = key.substr(this.filterPrefix.length);
                newFilter[filterKey] = element;

                const existingElement = (filter && filterKey in filter) ? filter[filterKey] : null;
                if (element !== existingElement) {
                    filterChanged = true;
                }
            }
        }
        shouldReload = shouldReload || filterChanged;

        if (shouldReload) {
            this.reload();
        }
    }

    updateFilter(filter: TFilter): void {
        const filterQueryParams = {};

        for (const key in filter) {
            if (Object.prototype.hasOwnProperty.call(filter, key)) {
                const element = filter[key];
                if (element !== null && element !== undefined) {
                    filterQueryParams[this.filterPrefix + key] = element;
                }
            }
        }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams: {
                filter: filterQueryParams
            }
        });
    }

    updatePage(page: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams: {
                page
            }
        });
    }

    updatePageSize(pageSize: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams: {
                pageSize
            }
        });
    }

    updateSort(sort: SortDefinition): void {
        if (!sort) {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParamsHandling: 'merge',
                queryParams: {
                    sortColumn: null,
                    sortDirection: null
                }
            });
        } else {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParamsHandling: 'merge',
                queryParams: {
                    sortColumn: sort.column,
                    sortDirection: sort.direction
                }
            });
        }
    }

    update(state: PageSelection): void {
        const params = {
            page: state.page,
            pageSize: state.pageSize,
            sortColumn: state.sortColumn,
            sortDirection: state.sortDirection
        };
        if (!state.sortColumn) {
            delete params.sortColumn;
            delete params.sortDirection;
        }
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: params,
                queryParamsHandling: 'merge'
            });
    }
}
