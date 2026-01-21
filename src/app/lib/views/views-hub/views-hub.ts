import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { selectCurrentList, selectCurrentSpace, selectCurrentView, selectCurrentViewId } from "@common/store/hierarchy/hierarchy.selectors";
import { selectWorkspaceId } from "@common/store/workspace/workspace.selectors";
import { ButtonIconModule } from "@common/ui/button-icon/button-icon.module";
import { ButtonModule } from "@common/ui/button/button.module";
import { getViewLinkByType } from "@common/utils/get-view-link-by-type.function";
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
    FaIconComponent,
    RouterLink
],
})
export class ViewsHubComponent {
  private store = inject(Store);

  faChartBar = faChartBar;
  workspaceId = this.store.selectSignal(selectWorkspaceId);
  currentView = this.store.selectSignal(selectCurrentView);
  currentList = this.store.selectSignal(selectCurrentList);
  currentSpace = this.store.selectSignal(selectCurrentSpace);

  hiherarchyItem = computed(() => {
    const list = this.currentList();
    const space = this.currentSpace();

    return list || space;
  })

  viewsFromHierarchyItemWithUrls = computed(() => {
    const item = this.hiherarchyItem();
    const views = item?.views || [];

    return views.map(view => ({
      ...view,
      url: getViewLinkByType(view.type, view.id, this.workspaceId() as string),
      isActive: view.id === this.store.selectSignal(selectCurrentViewId)()
    }));
  })
}
