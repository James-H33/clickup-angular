import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkspaceService } from './lib/common/services/workspace.service';
import { Store } from '@ngrx/store';
import { loadTreeStart } from '@common/store/hierarchy/hierarchy.actions';
import { HierarchyRoutingEventService } from '@common/services/hierarchy-routing-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    RouterOutlet
  ]
})
export class App {
  protected readonly title = signal('clickup-angular');
}
