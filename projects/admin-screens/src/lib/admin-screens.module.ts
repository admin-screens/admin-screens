import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { PagedListComponent } from './paged-list/paged-list.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { SectionTitleComponent } from './section-title/section-title.component';



@NgModule({
    declarations: [PagedListComponent, FilterContainerComponent, SectionTitleComponent],
    imports: [
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        CommonModule
    ],
    exports: [PagedListComponent]
})
export class AdminScreensModule { }
