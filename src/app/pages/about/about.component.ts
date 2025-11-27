import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class AboutComponent {}
