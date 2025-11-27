import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class HomeComponent {}
