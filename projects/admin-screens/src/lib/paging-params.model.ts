import { SortDefinition } from './sort-definition.model';
import { FilterModel } from './filter.model';

export interface PagingParams<T extends FilterModel> {
    sort: SortDefinition;
    skip: number;
    take: number;
    filter?: T;
}
