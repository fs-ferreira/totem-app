import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiModule } from '../../ui/ui.module';

@Component({
  selector: 'help-button',
  imports: [UiModule],
  template: `
  <button matIconButton aria-label="Support button" class="!fixed bottom-5 right-5">
    <mat-icon class="!text-(--mat-sys-primary)">help</mat-icon>
  </button>
  `,
  styleUrl: './help-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpButtonComponent { }
