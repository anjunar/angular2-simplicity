import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {ngZone} from "./app/environment";

declare global {
  function secureFetch(url : string, method? : string, data? : any) : Promise<any>
}

platformBrowserDynamic().bootstrapModule(AppModule,{
 ngZone: ngZone
})
  .catch(err => console.error(err));
