import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AsGenericResolver implements Resolve<Promise<any>> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let promises = [];

    let assets: any[] = route.data["assets"];
    if (assets) {
      for (const asset of assets) {
        promises.push(fetch(asset["url"]).then(response => response.text()))
      }
    }

    let jsons: any[] = route.data["json"];
    if (jsons) {
      for (const json of jsons) {
        promises.push(fetch(json["url"]).then(response => response.json()))
      }
    }

    return Promise.all(promises);

  }
}
