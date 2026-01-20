import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { selectCurrentList, selectCurrentView, selectCurrentViewId } from "@common/store/hierarchy/hierarchy.selectors";
import { ButtonIconModule } from "@common/ui/button-icon/button-icon.module";
import { ButtonModule } from "@common/ui/button/button.module";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { Store } from "@ngrx/store";

@Component({
  selector: 'cu-views-hub',
  templateUrl: './views-hub.html',
  styleUrls: ['./views-hub.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    ButtonModule,
    ButtonIconModule,
    FaIconComponent
],
})
export class ViewsHubComponent {
  private store = inject(Store);

  faChartBar = faChartBar;
  currentView = this.store.selectSignal(selectCurrentView);
  currentList = this.store.selectSignal(selectCurrentList);

  viewsFromList = computed(() => {
    const list = this.currentList();

    if (!list || !list.views) {
      return [];
    }

    return list.views;
  })
}
