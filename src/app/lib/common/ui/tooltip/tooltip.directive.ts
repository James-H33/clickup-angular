import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from "@angular/cdk/portal";
import { Directive, ElementRef, HostListener, input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[cuTooltip]',
})
export class TooltipDirective {
  templateRef = input<TemplateRef<any> | null>(null,
    { alias: 'cuTooltipTemplate' }
  );

  delay = input<number | null>(300,
    { alias: 'cuTooltipDelay' }
  );

  private overlayRef: any;
  private showTimeoutId: any;

  constructor(
    private hostElement: ElementRef,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    const templateRef = this.templateRef();

    if (!templateRef) {
      return;
    }

    this.showTimeoutId = setTimeout(() => {
      this.showTooltip(templateRef);
    }, this.delay() ?? 300);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.overlayRef?.detach();

    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }
  }

  showTooltip(templateRef: TemplateRef<any>) {
    // 1 Create the position strategy
    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.hostElement)
      .withPositions([{
        originX: 'center', originY: 'top',
        overlayX: 'center', overlayY: 'bottom',
        offsetY: -8 // Gap between element and tooltip
      }]);

    // 2. Create the overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    // 3. Create the Portal (The link between Template and Overlay)
    const portal = new TemplatePortal(templateRef, this.vcr);

    // 4. Attach
    this.overlayRef.attach(portal);
  }
}
