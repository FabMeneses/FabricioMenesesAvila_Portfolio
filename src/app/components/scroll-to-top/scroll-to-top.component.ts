import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  template: `
    @if (isVisible()) {
      <button
        (click)="scrollToTop()"
        aria-label="Volver arriba"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-orange text-cream rounded-full shadow-xl flex items-center justify-center hover:bg-teal hover:scale-110 transition-all duration-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  readonly isVisible = signal(false);

  private readonly scrollHandler = (): void => {
    this.isVisible.set(window.scrollY > 320);
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
