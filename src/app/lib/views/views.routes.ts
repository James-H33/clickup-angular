import { Routes } from '@angular/router';
import { ViewsHubComponent } from './views-hub/views-hub';
import { ListViewComponent } from './list/list-view';
import { BoardViewComponent } from './board/board-view';

export const viewsRoutes: Routes = [
  {
    path: '',
    component: ViewsHubComponent,
    children: [
      { path: 'l/:id', component: ListViewComponent },
      { path: 'b/:id', component: BoardViewComponent },
    ]
  },
];
