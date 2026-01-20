import { NgModule } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { hierarchyFeature } from "./hierarchy.reducer";
import * as hierarchyEffects from "./hierarchy.effects";

@NgModule({
  providers: [
    provideStore(),
    provideState(hierarchyFeature),
    provideEffects([hierarchyEffects]),
  ]
})
export class HierarchyStoreModule {}
