import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { TranslateService } from '@ngx-translate/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastService);
  const translateService = inject(TranslateService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      const message =
        error.error?.message ||
        'Error inesperado';

      toastService.show(message);

      if (error.status === 401) {
        toastService.show(translateService.instant("ERRORS.INVALID_CREDENTIALS"));
      } else if (error.status === 500 && error.error?.message) {
        toastService.show(translateService.instant("ERRORS.SERVER_ERROR") + ': ' + message);
      } else {
        toastService.show(message);
      }

      return throwError(() => error);
    })
  );
};