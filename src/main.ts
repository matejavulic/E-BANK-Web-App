/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 *
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * First part of function call start Angular app in browser and the
 * second part starts module (defined in app.module.ts in export class) 
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

