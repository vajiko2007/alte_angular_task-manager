import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, mergeMap, throwError} from "rxjs";
import {Router} from "@angular/router";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const accessToken = authService.accessToken
  const refreshToken = authService.refreshToken as string

  if (!accessToken) {
    return next(req);
  }

  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  })).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return authService.token(refreshToken)
          .pipe(
            mergeMap(
              res => {
                localStorage.setItem('accessToken', res.token.accessToken)
                localStorage.setItem('refreshToken', res.token.refreshToken)
                return next(req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
                }))
              }),
              catchError(res =>{
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                router.navigate([''])

                return throwError(() => res)

              })
          )
      }

      return throwError(() => err)
    })
  );
};
