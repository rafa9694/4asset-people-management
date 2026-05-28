import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    NgxMaskDirective
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading = false;

  form = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
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
    confirmPassword: [
      '',
      [
        Validators.required
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
  },
  {
    validators: [
      this.passwordMatchValidator
    ]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get nameControl() {
    return this.form.controls.name;
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }

  get phoneControl() {
    return this.form.controls.phone;
  }

  get birthDateControl() {
    return this.form.controls.birthDate;
  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue = this.form.getRawValue();
    const payload: RegisterRequest = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      birthDate: new Date(
        formValue.birthDate
      ).toISOString()
    };

    this.authService.register(payload)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        }
      });
  }
}