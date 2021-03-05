import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HasId } from './has-id.model';
import { PagingParams } from './paging-params.model';
import { Page } from './page.model';
import { FilterModel } from './filter.model';
import { ClrDatagridSortOrder } from '@clr/angular';


export abstract class CrudDataProvider<T extends HasId, TFilter extends FilterModel> {
    protected abstract api: string;
    protected abstract routes: string[];

    constructor(protected httpClient: HttpClient) {
    }

    search(filter: PagingParams<TFilter>, parentIds: string[] = null): Observable<Page<T>> {
        const url = this.getBaseUrl(parentIds);

        const requestParams: any = {
            skip: filter.skip.toString(),
            take: filter.take.toString()
        };

        if (filter.sort) {
            requestParams['sortColumn'] = filter.sort.column;

            if (filter.sort.direction !== ClrDatagridSortOrder.UNSORTED) {
                requestParams['sortDirection'] = filter.sort.direction;
            }
        }

        if (filter.filter) {
            for (const key in filter.filter) {
                if (Object.prototype.hasOwnProperty.call(filter.filter, key)) {
                    const element = filter.filter[key];
                    if (element !== null && element !== undefined) {
                        requestParams[key] = element;
                    }
                }
            }
        }

        return this.httpClient.get<Page<T>>(url, {
            params: requestParams
        });
    }

    create(record: T, parentIds: string[] = null): Observable<T> {
        const url = `${this.getBaseUrl(parentIds)}`;
        return this.httpClient.post<T>(url, record);
    }

    getById(id: string, parentIds: string[] = null): Observable<T> {
        const url = `${this.getBaseUrl(parentIds)}/${id}`;
        return this.httpClient.get<T>(url);
    }

    update(record: T, parentIds: string[] = null): Observable<void> {
        const url = `${this.getBaseUrl(parentIds)}/${record.id}`;
        return this.httpClient.put<void>(url, record);
    }

    delete(id: string, parentIds: string[] = null): Observable<void> {
        const url = `${this.getBaseUrl(parentIds)}/${id}`;
        return this.httpClient.delete<void>(url);
    }

    getRoot(parentIds: string[] = null): Observable<Page<T>> {
        const url = `${this.getBaseUrl(parentIds)}/root`;
        return this.httpClient.get<Page<T>>(url);
    }

    getChildren(id: string, parentIds: string[] = null): Observable<Page<T>> {
        const url = `${this.getBaseUrl(parentIds)}/${id}/children`;
        return this.httpClient.get<Page<T>>(url);
    }

    protected getBaseUrl(parentIds: string[] = null) {
        this.verifyParentIds(parentIds);
        let url = `${this.api}`;
        for (let index = 0; index < this.routes.length; index++) {
            const route = this.routes[index];
            url += '/' + route;

            if (index !== this.routes.length - 1) {
                url += '/' + parentIds[index];
            }
        }
        return url;
    }

    private verifyParentIds(parentIds: string[]) {
        if (this.routes.length > 1 && (
            !parentIds || parentIds.length !== this.routes.length - 1
        )) {
            throw Error('Not enough parent ids provided.');
        }
    }
}
