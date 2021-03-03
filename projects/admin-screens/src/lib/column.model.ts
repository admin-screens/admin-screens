import { ColumnDataVisualizationType } from './column-data-visualization-type.enum';
import { HasId } from './has-id.model';

export interface Column<T extends HasId> {
    id: string;
    title: string;
    property?: string;
    propertyExpression?: ((obj: T) => any);
    subPropertyExpression?: ((val: any) => string);
    visualization: ColumnDataVisualizationType;
    hidden?: boolean;
    sortable?: boolean;
    route?: ((obj: T) => string[]);
}
