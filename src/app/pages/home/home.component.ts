import { Component, ChangeDetectionStrategy, signal, computed, effect, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ContactService } from '../../services/contact.service';
import { LanguageService } from '../../services/language.service';

type ProjectFilter = 'all' | 'frontend' | 'backend' | 'fullstack';

@Component({
  selector: 'app-home',
  imports: [AnimateOnScrollDirective, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private readonly langSvc = inject(LanguageService);
  protected readonly t = this.langSvc.current;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  // Availability badge
  readonly isAvailable = signal(true);

  // CV download URLs based on language
  readonly cvDevUrl = computed(() =>
    this.langSvc.lang() === 'en'
      ? '/cv/FabricioMenesesAvila_CV_EN.pdf'
      : '/cv/FabricioMenesesAvila_CV.pdf'
  );
  readonly cvItUrl = computed(() =>
    this.langSvc.lang() === 'en'
      ? '/cv/FabricioMenesesAvila_IT_CV_EN.pdf'
      : '/cv/FabricioMenesesAvila_IT_CV.pdf'
  );

  // Stats counters
  readonly displayYear = signal(0);
  readonly displayProjects = signal(0);
  private countersStarted = false;

  // Typing animation
  readonly typedTitle = signal('');
  private typingIndex = 0;
  private typingCharIndex = 0;
  private typingDeleting = false;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly typingTitles = computed(() =>
    this.langSvc.lang() === 'es'
      ? ['Desarrollador Frontend', 'Desarrollador Full Stack', 'Co-fundador de FALCodeX', 'Diseñador UI/UX']
      : ['Frontend Developer', 'Full Stack Developer', 'Co-founder of FALCodeX', 'UI/UX Designer']
  );

  // Project filter
  readonly activeFilter = signal<ProjectFilter>('all');
  readonly filters = computed(() => [
    { label: this.t().filter_all, value: 'all' as ProjectFilter },
    { label: this.t().filter_frontend, value: 'frontend' as ProjectFilter },
    { label: this.t().filter_backend, value: 'backend' as ProjectFilter },
    { label: this.t().filter_fullstack, value: 'fullstack' as ProjectFilter },
  ]);

  constructor() {
    effect(() => {
      this.typingTitles(); // subscribe to lang changes
      this.restartTyping();
    });
  }

  ngAfterViewInit(): void {
    const statsEl = document.getElementById('stats-counter');
    if (!statsEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.countersStarted) {
        this.countersStarted = true;
        this.animateCounter(v => this.displayYear.set(v), 1, 1000);
        this.animateCounter(v => this.displayProjects.set(v), 3, 1200);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsEl);
  }

  private animateCounter(setter: (v: number) => void, target: number, duration: number): void {
    const steps = 30;
    const stepDuration = duration / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setter(Math.round((step / steps) * target));
      if (step >= steps) clearInterval(interval);
    }, stepDuration);
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
  }

  private restartTyping(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingIndex = 0;
    this.typingCharIndex = 0;
    this.typingDeleting = false;
    this.typedTitle.set('');
    this.typeNext();
  }

  private typeNext(): void {
    const titles = this.typingTitles();
    const current = titles[this.typingIndex % titles.length];
    if (!this.typingDeleting) {
      this.typingCharIndex++;
      this.typedTitle.set(current.substring(0, this.typingCharIndex));
      if (this.typingCharIndex === current.length) {
        this.typingTimeout = setTimeout(() => { this.typingDeleting = true; this.typeNext(); }, 2200);
        return;
      }
      this.typingTimeout = setTimeout(() => this.typeNext(), 80);
    } else {
      this.typingCharIndex--;
      this.typedTitle.set(current.substring(0, this.typingCharIndex));
      if (this.typingCharIndex === 0) {
        this.typingDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % titles.length;
        this.typingTimeout = setTimeout(() => this.typeNext(), 300);
        return;
      }
      this.typingTimeout = setTimeout(() => this.typeNext(), 40);
    }
  }

  setFilter(value: ProjectFilter): void {
    this.activeFilter.set(value);
  }

  isVisible(category: 'frontend' | 'backend' | 'fullstack'): boolean {
    const f = this.activeFilter();
    return f === 'all' || f === category;
  }

  filterBtnClass(value: ProjectFilter): string {
    return this.activeFilter() === value
      ? 'px-5 py-2 rounded-xl text-sm font-semibold bg-orange text-cream shadow-md transition-all duration-300'
      : 'px-5 py-2 rounded-xl text-sm font-semibold bg-teal/10 dark:bg-teal/20 border border-teal/30 dark:border-teal/40 text-teal dark:text-cream hover:border-orange hover:text-orange transition-all duration-300';
  }

  readonly falcodexStack = [
    'Angular', 'TypeScript', 'Tailwind CSS', '.NET 9', 'ASP.NET Core',
    'Entity Framework', 'SQL Server', 'JWT', 'Capacitor', 'PWA',
    'Clean Architecture', 'REST API', 'Figma', 'GitHub Actions'
  ];

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitError.set(false);

      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess.set(false);
          }, 5000);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.submitError.set(true);
          setTimeout(() => {
            this.submitError.set(false);
          }, 5000);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
