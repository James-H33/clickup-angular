
import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { RedirectService } from './lib/guards/redirect/redirect.service';
import { SignupComponent } from './lib/signup/signup';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    redirectTo: () => {
     const redirectService = inject(RedirectService);

      return redirectService.redirect();
    },
    pathMatch: 'full'
  },
  {
    path: ':workspaceId',
    loadChildren: () => import('./lib/shell/shell.routes').then(m => m.shellRoutes)
  },
];
