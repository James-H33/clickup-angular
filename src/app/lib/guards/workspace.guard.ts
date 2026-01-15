import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkspaceRedirectGuard implements CanActivate {
  private static readonly STORAGE_KEY_ID = 'workspace-id';

  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = localStorage.getItem(WorkspaceRedirectGuard.STORAGE_KEY_ID);

    if (id) {
      return this.router.createUrlTree([`/${id}/home`]);
    } else {
      // fallback: redirect to signup or another route if id is missing
      return this.router.createUrlTree(['/signup']);
    }
  }
}
