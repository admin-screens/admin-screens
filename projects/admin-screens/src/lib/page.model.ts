import { HasId } from './has-id.model';

export interface Page<T extends HasId | string> {
    data: T[];
    total: number;
}
