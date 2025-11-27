import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Aplicar tema inicial
    this.applyTheme(this.themeSignal());

    // Efecto para aplicar tema cuando cambie
    effect(() => {
      this.applyTheme(this.themeSignal());
    });
  }

  readonly theme = this.themeSignal.asReadonly();

  toggleTheme(): void {
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private getInitialTheme(): Theme {
    if (typeof window === 'undefined') {
      return 'light';
    }

    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Verificar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') {
      return;
    }

    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}

