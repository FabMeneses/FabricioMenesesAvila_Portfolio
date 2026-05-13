import { Directive, ElementRef, inject, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer: IntersectionObserver | null = null;

  /** Threshold para activar la animación (0-1) */
  threshold = input(0.1);

  /** Si debe animarse solo una vez o cada vez que entra en viewport */
  once = input(true);

  ngOnInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    const element = this.el.nativeElement;

    if (
      !element.classList.contains('animate-on-scroll') &&
      !element.className.includes('animate-fade') &&
      !element.classList.contains('animate-scale-up')
    ) {
      element.classList.add('animate-fade-up');
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      element.classList.add('animate-visible');
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: this.threshold(),
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');

          if (this.once()) {
            this.observer?.unobserve(entry.target);
          }
        } else if (!this.once()) {
          entry.target.classList.remove('animate-visible');
        }
      });
    }, options);

    this.observer.observe(element);
  }
}
