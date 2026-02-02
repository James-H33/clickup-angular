import { NgModule } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import * as taskEffects from "./task.effects";
import { taskFeature } from "./task.reducer";

@NgModule({
  providers: [
    provideStore(),
    provideState(taskFeature),
    provideEffects([taskEffects]),
  ],
})
export class TaskStoreModule {}
