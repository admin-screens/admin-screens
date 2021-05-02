import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'adm-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent {
  @Input() title: string;
  @Input() toggled = true;
  @Input() hasToggle = false;
  @Output() toggledChange = new EventEmitter<boolean>();

  toggle() {
    if (this.hasToggle) {
      this.toggled = !this.toggled;
      this.toggledChange.next(this.toggled);
    }
  }
}
