import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { HasId } from '../has-id.model';
import { RouterTestingModule } from '@angular/router/testing';

import { PagedListComponent } from './paged-list.component';

describe('PagedListComponent', () => {
    let component: PagedListComponent<HasId>;
    let fixture: ComponentFixture<PagedListComponent<HasId>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PagedListComponent],
            imports: [
                ClarityModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PagedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
