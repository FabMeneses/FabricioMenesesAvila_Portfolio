import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  computed,
  inject,
  signal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

type NavItem = {
  readonly fragment: string;
  readonly label: string;
};

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full shrink-0' },
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly langSvc = inject(LanguageService);
  protected readonly themeSvc = inject(ThemeService);
  protected readonly t = this.langSvc.current;
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly activeFragment = signal('inicio');
  protected readonly cvDevUrl = computed(() =>
    this.langSvc.lang() === 'en'
      ? '/cv/FabricioMenesesAvila_CV_EN.pdf'
      : '/cv/FabricioMenesesAvila_CV.pdf'
  );
  protected readonly navItems = computed<readonly NavItem[]>(() => [
    { fragment: 'inicio', label: this.t().nav_home },
    { fragment: 'sobre-mi', label: this.t().nav_about },
    { fragment: 'conocimientos-ti', label: this.t().nav_knowledge },
    { fragment: 'proyectos', label: this.t().nav_projects },
    { fragment: 'contacto', label: this.t().nav_contact }
  ]);

  private sectionObserver: IntersectionObserver | null = null;
  private observerDelay: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.scheduleSectionObserverSetup();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.scheduleSectionObserverSetup();
      });
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();

    if (this.observerDelay) {
      clearTimeout(this.observerDelay);
    }
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  protected selectFragment(fragment: string): void {
    this.activeFragment.set(fragment);
    this.closeMobileMenu();
  }

  protected navItemClass(fragment: string): string {
    const baseClass =
      'relative rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-darker-brown';

    return this.activeFragment() === fragment
      ? `${baseClass} bg-teal text-cream shadow-sm shadow-teal/20 dark:bg-orange dark:text-darker-brown`
      : `${baseClass} text-dark-brown/80 hover:bg-teal/10 hover:text-teal dark:text-cream/80 dark:hover:bg-cream/10 dark:hover:text-cream`;
  }

  protected mobileNavItemClass(fragment: string): string {
    const baseClass =
      'flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200';

    return this.activeFragment() === fragment
      ? `${baseClass} bg-teal text-cream dark:bg-orange dark:text-darker-brown`
      : `${baseClass} text-dark-brown hover:bg-teal/10 hover:text-teal dark:text-cream dark:hover:bg-cream/10`;
  }

  private setupSectionObserver(): void {
    this.sectionObserver?.disconnect();
    this.sectionObserver = null;

    const sections = this.navItems()
      .map((item) => document.getElementById(item.fragment))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || !('IntersectionObserver' in window)) {
      return;
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          this.activeFragment.set(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55]
      }
    );

    for (const section of sections) {
      this.sectionObserver.observe(section);
    }
  }

  private scheduleSectionObserverSetup(): void {
    if (this.observerDelay) {
      clearTimeout(this.observerDelay);
    }

    this.observerDelay = setTimeout(() => {
      this.setupSectionObserver();
    }, 250);
  }
}
