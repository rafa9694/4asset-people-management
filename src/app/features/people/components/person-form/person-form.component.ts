import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';

import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskDirective
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent
  implements OnInit {

  @Input()
  initialValue?: Partial<Person>;

  @Input()
  loading = false;

  @Output()
  formSubmit = new EventEmitter<any>();

  form = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [
      '',
      [
        Validators.required
      ]
    ],
    birthDate: [
      '',
      [
        Validators.required
      ]
    ]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (!this.initialValue) {
      return;
    }

    this.form.patchValue({
      name: this.initialValue.name,
      email: this.initialValue.email,
      phone: this.initialValue.phone,
      birthDate: this.initialValue.birthDate?.split('T')[0]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    this.formSubmit.emit({
      ...formValue,
      birthDate: new Date(
        formValue.birthDate
      ).toISOString()
    });
  }
}