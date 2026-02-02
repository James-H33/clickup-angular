import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { RedirectService } from './lib/guards/redirect/redirect.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { WorkspaceStoreModule } from './lib/common/store/workspace/workspace-store.module';
import { HierarchyStoreModule } from '@common/store/hierarchy/hierarchy-store.module';
import { DialogModule } from '@angular/cdk/dialog';
import { TaskStoreModule } from '@common/store/task/task-store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    RedirectService,

    // NgRx Store and Effects
    provideStore(),
    provideEffects(),

    // Modules Imports
    importProvidersFrom([
      // These should probably be moved to shell module?
      WorkspaceStoreModule,
      HierarchyStoreModule,
      TaskStoreModule,

      DialogModule,
    ]),
  ]
};
