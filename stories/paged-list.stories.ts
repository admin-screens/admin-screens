// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { PagedListComponent } from '../projects/admin-screens/src/lib/paged-list/paged-list.component';
import { HasId } from '../projects/admin-screens/src/lib/has-id.model';
import { moduleMetadata } from '@storybook/angular';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import "!style-loader!css-loader!../node_modules/@clr/ui/clr-ui.min.css";
import "!style-loader!css-loader!../node_modules/@clr/icons/clr-icons.min.css";
import '../node_modules/@clr/icons/clr-icons.min.js';
import { ColumnDataVisualizationType } from '../projects/admin-screens/src/lib/column-data-visualization-type.enum';
import { BrowserModule } from '@angular/platform-browser';
import { ActionTypeEnum } from '../projects/admin-screens/src/lib/action-type.enum';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export default {
  title: 'Example/Paged List',
  component: PagedListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ClarityModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule],
    }),
  ],
  argTypes: {
  },
} as Meta;

const Template: Story<PagedListComponent<HasId>> = (args: PagedListComponent<HasId>) => ({
  component: PagedListComponent,
  props: args,
});


export const LoadingStory = Template.bind({});
LoadingStory.args = {
  loading: 1
};

export const ReadyStory = Template.bind({});
ReadyStory.args = {
  loading: 0
};

export const SimpleColumnStory = Template.bind({});
SimpleColumnStory.args = {
  loading: 0,
  total: 1,
  columns: [
    {
      id: 'name',
      title: 'Name',
      property: 'name',
      visualization: ColumnDataVisualizationType.Text,
      hidden: false,
      sortable: false
    },
    {
      id: 'link',
      title: 'Link',
      property: 'name',
      visualization: ColumnDataVisualizationType.Hyperlink,
      hidden: false,
      sortable: false,
      route: (x) => [x.id]
    }
  ],
  records: [
    {
      name: 'Hello world',
      id: '123'
    }
  ]
};

export const ActionBarStory = Template.bind({});
ActionBarStory.args = {
  loading: 0,
  total: 1,
  buttonBarActions: [
    {
      label: 'New',
      icon: 'plus',
      type: ActionTypeEnum.RouterLink,
      routerLink: ['.', 'new']
    },
    {
      label: 'Record Action',
      type: ActionTypeEnum.Action,
      classes: ['btn-outline-danger'],
      badgeClasses: ['badge-danger'],
      execute: (recs) => {
        return of(true)
          .pipe(delay(2000));
      }
    }
  ],
  columns: [
    {
      id: 'name',
      title: 'Name',
      property: 'name',
      visualization: ColumnDataVisualizationType.Text,
      hidden: false,
      sortable: false
    }
  ],
  records: [
    {
      name: 'World',
      id: '123'
    },
    {
      name: 'Hello',
      id: '123'
    }
  ]
};

export const GridActionsStory = Template.bind({});
GridActionsStory.args = {
  loading: 0,
  total: 1,
  gridActions: [
    {
      gridLabel: (t) => `Promote ${t.name}`,
      type: ActionTypeEnum.Action,
      execute: (recs) => {
        return of(true)
          .pipe(delay(2000));
      }
    }
  ],
  columns: [
    {
      id: 'name',
      title: 'Name',
      property: 'name',
      visualization: ColumnDataVisualizationType.Text,
      hidden: false,
      sortable: false
    }
  ],
  records: [
    {
      name: 'World',
      id: '123'
    }
  ]
};