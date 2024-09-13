import {HttpInterceptorFn, HttpXsrfTokenExtractor} from '@angular/common/http';
import {inject} from "@angular/core";

export const httpXsrfInterceptor: HttpInterceptorFn = (req, next) => {
  let headerName = 'XSRF-TOKEN';
  const tokenService = inject(HttpXsrfTokenExtractor)

  req = req.clone({
    withCredentials: true
  })
  console.log(req);
  req.headers.set('withCredentials', 'true');
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next(req);
  }

  const token = tokenService.getToken();

  // Be careful not to overwrite an existing header of the same name.
  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({ headers: req.headers.set('X-XSRF-TOKEN', token) });
  }

  return next(req);
};
