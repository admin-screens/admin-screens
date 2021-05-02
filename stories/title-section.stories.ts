// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SectionTitleComponent } from '../projects/admin-screens/src/lib/section-title/section-title.component';
import { HasId } from '../projects/admin-screens/src/lib/has-id.model';
import { moduleMetadata } from '@storybook/angular';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import "!style-loader!css-loader!../node_modules/@clr/ui/clr-ui.min.css";
import "!style-loader!css-loader!../node_modules/@clr/icons/clr-icons.min.css";
import '../node_modules/@clr/icons/clr-icons.min.js';
import { BrowserModule } from '@angular/platform-browser';

export default {
  title: 'Example/Title Section',
  component: SectionTitleComponent,
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

const Template: Story<SectionTitleComponent> = (args: SectionTitleComponent) => ({
  component: SectionTitleComponent,
  props: args,
});


export const SectionTitleStory = Template.bind({});
SectionTitleStory.args = {
  title: 'Main info',
  hasToggle: false
};

export const ToggleStory = Template.bind({});
ToggleStory.args = {
  title: 'Toggle Me',
  hasToggle: true,
  toggled: false
};

