import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  static readonly STORAGE_KEY_ID = 'workspace_id';

  router = inject(Router);

  redirect() {
    const id = localStorage.getItem(RedirectService.STORAGE_KEY_ID);

    if (id) {
      return this.router.createUrlTree([`/${id}/home`]);
    } else {
      return this.router.createUrlTree(['/signup']);
    }
  }

}
