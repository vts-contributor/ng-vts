import { Direction, Directionality } from '@angular/cdk/bidi';
import {
	ChangeDetectionStrategy,
	Component,
	// ContentChildren,
	ElementRef,
	OnDestroy,
	OnInit,
	Optional,
	// QueryList,
	ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'vts-protable-data',
	exportAs: 'vtsProTableData',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	preserveWhitespaces: false,
	template: `
		<h5>Table Content</h5>
     <ng-content></ng-content>
   `,
	host: {
		'[class.vts-protable-rtl]': `dir === 'rtl'`,
	}
})
export class VtsProTableDataComponent implements OnDestroy, OnInit {
	dir: Direction = 'ltr';
	private destroy$ = new Subject<void>();

	constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
		// TODO: move to host after View Engine deprecation
		this.elementRef.nativeElement.classList.add('vts-protable');
	}
	ngOnInit(): void {
		this.dir = this.directionality.value;
		this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
			this.dir = direction;
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
