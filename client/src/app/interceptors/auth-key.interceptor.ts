import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../service/local-storage.service';
import { inject } from '@angular/core';

export const authKeyInterceptor: HttpInterceptorFn = (req, next) => {
  
  const storageService = inject(LocalStorageService);

  const token = storageService.get('auth-key');

  if (token) {
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
