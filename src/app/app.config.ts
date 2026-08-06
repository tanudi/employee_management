import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding, withNavigationErrorHandler } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
       provideRouter(routes, 
        withComponentInputBinding(), 
        withNavigationErrorHandler((error) => {
          const router = inject(Router)

          if(error) {
            console.error('Navigation error occured', error)
          }

          router.navigate(['/error'])
        })), 
       provideHttpClient(), 
       provideStore()]
};
