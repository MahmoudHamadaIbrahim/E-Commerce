import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    if (localStorage.getItem('freshToken')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('freshToken')!,
        },
      });
    }
  }

  return next(req);
};
