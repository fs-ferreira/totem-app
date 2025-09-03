import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [UiModule, RouterModule],
  template: `<div class="h-screen w-screen flex flex-col items-center" [routerLink]="'/menu'">
  <h1 class="text-lg font-thin !text-(--mat-sys-outline) pt-1">nome_cliente</h1>
  <div class="flex-1 flex flex-col mx-auto items-center justify-center gap-4 text-(--mat-sys-primary)">
    <h1 class="text-5xl font-semibold ">Bem-vindo!</h1>
    <h1 class="text-xl font-thin">Toque na tela para continuar</h1>
    <mat-icon class="touch-icon" aria-hidden="false" aria-label="Touch Icon" fontIcon="touch_app"></mat-icon>
  </div>
</div>`,
  styleUrl: './intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
}
