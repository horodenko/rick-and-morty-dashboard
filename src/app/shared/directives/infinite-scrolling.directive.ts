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
  constructor(private el: ElementRef, @Inject(NgZone) private zone: NgZone) {}

  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() threshold = 120;

  private window!: Window;

  ngOnInit(): void {
    // save window object for type safety
    this.window = window;
  }

  @HostListener('window:scroll')
  windowScrollEvent() {
    const heightOfWholePage = this.window.document.documentElement.scrollHeight;
    const heightOfElement = this.el.nativeElement.scrollHeight;
    const currentScrolledY = this.window.scrollY;
    const innerHeight = this.window.innerHeight;
    /**
     * the area between the start of the page and when this element is visible
     * in the parent component
     */
    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

    // calculated whether we are near the end
    const scrollToBottom =
      heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    // if the user is near end
    if (scrollToBottom < this.threshold) {
      /** NgZone:
       *
       * change detection isn't triggered for every scroll event, this might improve performance
       */
      this.zone.run(() => {
        this.nearEnd.emit();
      });
    }
  }
}
