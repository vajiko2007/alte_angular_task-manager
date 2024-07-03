import {inject, Injectable, InjectionToken, Injector} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";

export const MODAL_DATA = new InjectionToken<{}>('MODAL_DATA')
export interface ModalConfig {
  data: any
  width: number
  height: number
  backdrop: boolean
  closeOnBackdropClick: boolean
  panelClass:string
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  overlay = inject(Overlay)
  injector = inject(Injector)

  open(
    component: any,
    config: ModalConfig
  ){
    const overlayRef = this.overlay.create({
      width: `${config.width}px`,
      height: `${config.height}px`,
      hasBackdrop: config.backdrop,
      panelClass: config.panelClass,
      scrollStrategy:this.overlay.scrollStrategies.block(),
      positionStrategy:this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const componentPortal = new ComponentPortal(component)


    overlayRef.attach(componentPortal)

    // const componentInstance = component.instance
    // componentInstance.data = config.data

    if (config.closeOnBackdropClick){
      overlayRef.backdropClick().subscribe(() =>{
        overlayRef.detach()
      })
    }

    return overlayRef
  }

  createInjector(data:any, overlayRef:OverlayRef){
    const injectionTokens = new WeakMap();

    injectionTokens.set(MODAL_DATA, data);
    injectionTokens.set(OverlayRef, overlayRef)

    return new PortalInjector(this.injector, injectionTokens)
  }
}
