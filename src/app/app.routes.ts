
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './lib/views/home/home';
import { SignupComponent } from './lib/signup/signup';
import { ShellComponent } from './lib/shell/shell';
import { WorkspaceRedirectGuard } from './lib/guards/workspace.guard';
import { inject } from '@angular/core';
import { RedirectService } from './lib/guards/redirect/redirect.service';

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
    // canActivate: [WorkspaceRedirectGuard],
    loadChildren: () => import('./lib/shell/shell.routes').then(m => m.shellRoutes)
  },
];
