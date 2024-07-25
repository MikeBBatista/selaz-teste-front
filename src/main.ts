import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './enviroments/environment'
import { makeServer } from './mirage.config';



makeServer({ environment: environment.production ? 'production' : 'development' });

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
