import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Input()
  open = false;

  @Input()
  title = '';

  @Input()
  message = '';

  @Input()
  loading = false;

  @Output()
  confirmed = new EventEmitter<void>();

  @Output()
  closed = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}