import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      const message =
        error.error?.message ||
        'Error inesperado';

      toastService.show(message);

      return throwError(() => error);
    })
  );
};