import { NgModule } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';
import { workspaceFeature } from './workspace.reducer';
import * as workspaceEffects from './workspace.effects';

@NgModule({
  providers: [
    provideStore(),
    provideState(workspaceFeature),
    provideEffects([workspaceEffects]),
  ],
})
export class WorkspaceStoreModule { }
