/**
 *  @description
 *  This directive is responsible to detect if the page's scroll reaches the bottom
 *  so the Dashboard's mat-table can be updated with an infinite scrolling approach.
 * 
 *  @example
 *  <table
 *    appInfiniteScrolling
 *    (nearEnd)="onSearch()"
 *    mat-table
 *    [dataSource]="dataArray"
    >...</table>
 */
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScrolling]',
  standalone: true,
})
export class InfiniteScrollingDirective {
  constructor(
    private el: ElementRef,
    @Inject(NgZone) private zone: NgZone
  ) {}

  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() threshold = 120;

  private window!: Window;

  ngOnInit(): void {
    /** Initialize the window object for type safety */
    this.window = window;
  }

  /**
   * @returns {void}
   */
  @HostListener('window:scroll')
  windowScrollEvent(): void {
    const heightOfWholePage = this.window.document.documentElement.scrollHeight;
    const heightOfElement = this.el.nativeElement.scrollHeight;
    const currentScrolledY = this.window.scrollY;
    const innerHeight = this.window.innerHeight;
    /**
     * The area between the start of the page and when this element is visible
     * in the parent component
     */
    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

    /** Calculates whether we are near the end */
    const scrollToBottom =
      heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    /** Checks if user is near the end of the page (on the Y axis) */
    if (scrollToBottom < this.threshold) {
      /** NgZone:
       *   - Change detection isn't triggered for every scroll event, this might improve
       *   - performance
       */
      this.zone.run(() => {
        this.nearEnd.emit();
      });
    }
  }
}
