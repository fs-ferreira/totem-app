import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-menu',
  imports: [UiModule, RouterModule],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMenuComponent {

  public items = signal([
    { id: 'food', title: 'Lanches' },
    { id: 'drink', title: 'Bebidas' },
    { id: 'dessert', title: 'Doces' },
  ]);

}


