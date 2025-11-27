import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class ProjectsComponent {}
