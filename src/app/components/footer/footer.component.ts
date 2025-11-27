import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full shrink-0' },
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
