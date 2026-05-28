import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastService);
  const translateService = inject(TranslateService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      const message =
        error.error?.message ||
        'Error inesperado';

      toastService.show(message);

      if (error.status === 401) {
        authService.logout();

        router.navigate([
          '/login'
        ]);
      } else if (error.status === 500 && error.error?.message) {
        toastService.show(translateService.instant("ERRORS.SERVER_ERROR") + ': ' + message);
      } else {
        toastService.show(message);
      }

      return throwError(() => error);
    })
  );
};