import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // مهم لـ Material

import { routes } from './app.routes';
import { jwtInterceptor } from './shared/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // تفعيل قراءة الـ Slug كـ Input
    provideAnimations(),
    provideHttpClient(
      withInterceptors([jwtInterceptor]) // تفعيل الـ Interceptor هنا
    )
  ]
};
