<<<<<<< HEAD
=======
// لاحظ التغيير في الـ import هنا 👇
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
<<<<<<< HEAD
    provideZonelessChangeDetection(),
=======
    // 👇 تم استبدال provideZoneChangeDetection بهذا السطر
    provideZonelessChangeDetection(),
    
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor])
    )
  ]
<<<<<<< HEAD
};
=======
};
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
