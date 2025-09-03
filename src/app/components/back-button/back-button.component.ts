import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';

@Component({
  selector: 'back-button',
  imports: [UiModule, RouterModule],
  template: `<button matIconButton aria-label="Support button" class="!fixed top-2 left-5" (click)="handleNavigate()">
    <mat-icon class="!text-(--mat-sys-primary)">arrow_back</mat-icon>
  </button>`,
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Input() public url: string = ''
  private router = inject(Router);
  
  public handleNavigate() {
    this.router.navigate([this.url])
  }

 }
