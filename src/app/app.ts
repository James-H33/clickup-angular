import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkspaceService } from './lib/common/services/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    RouterOutlet
  ]
})
export class App {
  protected readonly title = signal('clickup-angular');
  private workspaceService = inject(WorkspaceService);

  ngOnInit(): void {
    this.workspaceService.init();
  }
}
