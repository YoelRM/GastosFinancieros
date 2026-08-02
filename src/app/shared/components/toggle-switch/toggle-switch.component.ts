import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="toggle"
      role="switch"
      [attr.aria-checked]="checked"
      [class.on]="checked"
      (click)="onToggle()"
    >
      <span class="dot"></span>
    </button>
  `,
  styleUrl: './toggle-switch.component.css',
})
export class ToggleSwitchComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
