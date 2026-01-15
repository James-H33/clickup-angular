import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "../nav/nav";
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar";
import { SimpleSidebarComponent } from "../sidebar/components/simple-sidebar/simple-sidebar";

@Component({
  selector: 'cu-shell',
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SidebarComponent,
    SimpleSidebarComponent,
    NavComponent
],
})
export class ShellComponent { }
