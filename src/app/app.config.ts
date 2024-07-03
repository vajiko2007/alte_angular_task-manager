import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./interceptors/token.interceptor";
import {Overlay, OverlayModule} from "@angular/cdk/overlay";
import {Portal, PortalModule} from "@angular/cdk/portal";

// @ts-ignore
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom([
      OverlayModule,
      PortalModule
    ]),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor

      ]),
      withFetch()
    )
  ]
};
