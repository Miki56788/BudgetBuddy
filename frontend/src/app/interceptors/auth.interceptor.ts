import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);

  // Проверяем, что код выполняется в браузере (а не на сервере)
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('access'); // берём токен, сохранённый после логина

    if (token) {
      // Клонируем запрос и добавляем заголовок Authorization
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
  }

  // Если токена нет — просто пропускаем запрос дальше
  return next(req);
};
