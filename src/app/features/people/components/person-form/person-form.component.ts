import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class PersonFormComponent implements OnChanges {

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
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
        )
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

  ngOnChanges(changes: SimpleChanges): void {
    const initialValue = changes['initialValue']?.currentValue;
    
    if (!initialValue) {
      this.form.reset();
      return;
    }

    this.form.patchValue({
      name: initialValue.name,
      email: initialValue.email,
      password: initialValue.password,
      phone: initialValue.phone,
      birthDate:
        initialValue.birthDate
          ?.split('T')[0]
    });
  }

  get nameControl() {
    return this.form.controls.name;
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get phoneControl() {
    return this.form.controls.phone;
  }

  get birthDateControl() {
    return this.form.controls.birthDate;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    this.formSubmit.emit({
      ...formValue,
      password: "Sup3rSecret!",
      birthDate: new Date(
        formValue.birthDate
      ).toISOString()
    });
  }
}