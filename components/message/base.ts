/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MessageConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsSingletonService } from '@ui-vts/ng-vts/core/services';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { VtsMessageData, VtsMessageDataOptions } from './typings';

let globalCounter = 0;

export abstract class VtsMNService {
  protected abstract componentPrefix: string;
  protected container?: VtsMNContainerComponent;

  constructor(
    protected vtsSingletonService: VtsSingletonService,
    protected overlay: Overlay,
    private injector: Injector
  ) {}

  remove(id?: string): void {
    if (this.container) {
      if (id) {
        this.container.remove(id);
      } else {
        this.container.removeAll();
      }
    }
  }

  protected getInstanceId(): string {
    return `${this.componentPrefix}-${globalCounter++}`;
  }

  protected withContainer<T extends VtsMNContainerComponent>(ctor: ComponentType<T>): T {
    let containerInstance = this.vtsSingletonService.getSingletonWithKey(this.componentPrefix);
    if (containerInstance) {
      return containerInstance as T;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(ctor, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010';

    if (!containerInstance) {
      this.container = containerInstance = componentRef.instance;
      this.vtsSingletonService.registerSingletonWithKey(this.componentPrefix, containerInstance);
    }

    return containerInstance as T;
  }
}

@Directive()
export abstract class VtsMNContainerComponent implements OnInit, OnDestroy {
  config?: Required<MessageConfig>;
  instances: Array<Required<VtsMessageData>> = [];

  protected readonly destroy$ = new Subject<void>();

  constructor(protected cdr: ChangeDetectorRef, protected vtsConfigService: VtsConfigService) {
    this.updateConfig();
  }

  ngOnInit(): void {
    this.subscribeConfigChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  create(data: VtsMessageData): Required<VtsMessageData> {
    const instance = this.onCreate(data);

    if (this.instances.length >= this.config!.vtsMaxStack) {
      this.instances = this.instances.slice(1);
    }

    this.instances = [...this.instances, instance];

    this.readyInstances();

    return instance;
  }

  remove(id: string, userAction: boolean = false): void {
    this.instances.some((instance, index) => {
      if (instance.messageId === id) {
        this.instances.splice(index, 1);
        this.instances = [...this.instances];
        this.onRemove(instance, userAction);
        this.readyInstances();
        return true;
      }
      return false;
    });
  }

  removeAll(): void {
    this.instances.forEach(i => this.onRemove(i, false));
    this.instances = [];

    this.readyInstances();
  }

  protected onCreate(instance: VtsMessageData): Required<VtsMessageData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    return instance as Required<VtsMessageData>;
  }

  protected onRemove(instance: Required<VtsMessageData>, userAction: boolean): void {
    instance.onClose.next(userAction);
    instance.onClose.complete();
  }

  protected readyInstances(): void {
    this.cdr.detectChanges();
  }

  protected abstract updateConfig(): void;

  protected abstract subscribeConfigChange(): void;

  protected mergeOptions(options?: VtsMessageDataOptions): VtsMessageDataOptions {
    const { vtsDuration, vtsAnimate, vtsPauseOnHover } = this.config!;
    return { vtsDuration, vtsAnimate, vtsPauseOnHover, ...options };
  }
}

@Directive()
export abstract class VtsMNComponent implements OnInit, OnDestroy {
  instance!: Required<VtsMessageData>;
  index?: number;

  readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();
  readonly animationStateChanged: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  protected options!: Required<VtsMessageDataOptions>;
  protected autoClose?: boolean;
  protected closeTimer?: number | ReturnType<typeof setTimeout>;
  protected userAction: boolean = false;
  protected eraseTimer: number | ReturnType<typeof setTimeout> | null = null;
  protected eraseTimingStart?: number;
  protected eraseTTL!: number;

  protected constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.options = this.instance.options as Required<VtsMessageDataOptions>;

    if (this.options.vtsAnimate) {
      this.instance.state = 'enter';
      this.animationStateChanged
        .pipe(
          filter(event => event.phaseName === 'done' && event.toState === 'leave'),
          take(1)
        )
        .subscribe(() => {
          clearTimeout(this.closeTimer);
          this.destroyed.next({
            id: this.instance.messageId,
            userAction: this.userAction
          });
        });
    }

    this.autoClose = this.options.vtsDuration > 0;

    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this.autoClose) {
      this.clearEraseTimeout();
    }
    this.animationStateChanged.complete();
  }

  onEnter(): void {
    if (this.autoClose && this.options.vtsPauseOnHover) {
      this.clearEraseTimeout();
      this.updateTTL();
    }
  }

  onLeave(): void {
    if (this.autoClose && this.options.vtsPauseOnHover) {
      this.startEraseTimeout();
    }
  }

  protected destroy(userAction: boolean = false): void {
    this.userAction = userAction;
    if (this.options.vtsAnimate) {
      this.instance.state = 'leave';
      this.cdr.detectChanges();
      this.closeTimer = setTimeout(() => {
        this.closeTimer = undefined;
        this.destroyed.next({
          id: this.instance.messageId,
          userAction: userAction
        });
      }, 200);
    } else {
      this.destroyed.next({
        id: this.instance.messageId,
        userAction: userAction
      });
    }
  }

  private initErase(): void {
    this.eraseTTL = this.options.vtsDuration;
    this.eraseTimingStart = Date.now();
  }

  private updateTTL(): void {
    if (this.autoClose) {
      this.eraseTTL -= Date.now() - this.eraseTimingStart!;
    }
  }

  private startEraseTimeout(): void {
    if (this.eraseTTL > 0) {
      this.clearEraseTimeout();
      this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
      this.eraseTimingStart = Date.now();
    } else {
      this.destroy();
    }
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer !== null) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = null;
    }
  }
}
