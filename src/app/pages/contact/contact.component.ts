import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class ContactComponent {}
