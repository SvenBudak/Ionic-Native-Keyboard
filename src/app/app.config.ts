import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideIonicAngular } from "@ionic/angular/standalone";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideIonicAngular({}),
    provideAnimationsAsync(),
  ],
};
