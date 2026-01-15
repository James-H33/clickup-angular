import { Routes } from '@angular/router';
import { SettingsHubComponent } from './hub/settings-hub';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsHubComponent,
    children: [
    ]
  },
];
