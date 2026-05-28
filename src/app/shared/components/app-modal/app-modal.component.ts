import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent {

  @Input()
  title = '';

  @Input()
  open = false;

  @Output()
  closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}