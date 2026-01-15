import { HomeComponent } from "../views/home/home";
import { ShellComponent } from "./shell";

export const shellRoutes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },

      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.routes').then(m => m.settingsRoutes)
      },

      {
        path: 'v',
        loadChildren: () => import('../views/views.routes').then(m => m.viewsRoutes)
      },
    ],
  },
]
