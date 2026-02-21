import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  host: { class: 'block w-full shrink-0' },
})
export class BottomNavComponent implements OnInit, OnDestroy {
  protected readonly activeSection = signal<string>('inicio');
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = typeof window !== 'undefined';

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Detectar la sección activa al cargar después de un pequeño delay
    setTimeout(() => {
      this.updateActiveSection();
    }, 100);

    // Escuchar eventos de scroll con throttling
    fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(100),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateActiveSection());

    // Escuchar cambios de tamaño de ventana
    fromEvent(window, 'resize', { passive: true })
      .pipe(
        throttleTime(100),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateActiveSection());
  }

  ngOnDestroy(): void {
    // Cleanup está manejado por takeUntilDestroyed
  }

  private updateActiveSection(): void {
    if (!this.isBrowser) return;

    const sections = ['inicio', 'sobre-mi', 'proyectos', 'contacto'];
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(section);
          return;
        }
      }
    }

    // Si estamos al final de la página, activar contacto
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      this.activeSection.set('contacto');
    }
  }

  protected scrollToSection(section: string): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 64; // Altura aproximada del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Actualizar sección activa después de un pequeño delay
      setTimeout(() => {
        this.activeSection.set(section);
        this.updateActiveSection();
      }, 300);
    }
  }

  protected isActive(section: string): boolean {
    return this.activeSection() === section;
  }
}

