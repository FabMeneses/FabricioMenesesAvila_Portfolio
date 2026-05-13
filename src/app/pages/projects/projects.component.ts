import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { LanguageService } from '../../services/language.service';
import { portfolioProjects, ProjectCategory } from '../../data/portfolio.data';

type ProjectFilter = ProjectCategory | 'all';

@Component({
  selector: 'app-projects',
  imports: [AnimateOnScrollDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class ProjectsComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = this.langSvc.current;
  protected readonly lang = this.langSvc.lang;
  protected readonly activeFilter = signal<ProjectFilter>('all');
  protected readonly totalProjects = portfolioProjects.length;
  protected readonly filters = computed(() => [
    { label: this.t().filter_all, value: 'all' as const },
    { label: this.t().filter_frontend, value: 'frontend' as const },
    { label: this.t().filter_backend, value: 'backend' as const },
    { label: this.t().filter_fullstack, value: 'fullstack' as const },
  ]);
  protected readonly projects = computed(() => {
    const filter = this.activeFilter();
    return portfolioProjects.filter((project) => filter === 'all' || project.category === filter);
  });

  protected setFilter(value: ProjectFilter): void {
    this.activeFilter.set(value);
  }

  protected filterClass(value: ProjectFilter): string {
    return this.activeFilter() === value
      ? 'motion-button px-5 py-2 rounded-xl text-sm font-semibold border bg-orange text-cream border-orange transition-all duration-300'
      : 'motion-button px-5 py-2 rounded-xl text-sm font-semibold border bg-teal/10 dark:bg-teal/20 border-teal/30 dark:border-teal/40 text-teal dark:text-cream hover:border-orange hover:text-orange transition-all duration-300';
  }

  protected cardClass(accent: 'teal' | 'orange' | 'brown'): string {
    const base =
      'motion-card animate-scale-up rounded-3xl overflow-hidden group flex flex-col h-full border';
    const variants = {
      teal: 'bg-teal/10 dark:bg-teal/20 border-teal/30 dark:border-teal/40',
      orange: 'bg-orange/10 dark:bg-orange/20 border-orange/30 dark:border-orange/40',
      brown: 'bg-brown/10 dark:bg-brown/20 border-brown/30 dark:border-brown/40',
    };
    return `${base} ${variants[accent]}`;
  }

  protected heroClass(accent: 'teal' | 'orange' | 'brown'): string {
    const variants = {
      teal: 'from-teal to-orange/50',
      orange: 'from-orange to-brown/50',
      brown: 'from-brown to-teal/50',
    };
    return `h-44 bg-gradient-to-br ${variants[accent]} flex items-center justify-center flex-shrink-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]`;
  }
}
