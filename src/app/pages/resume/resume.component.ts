import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { UiModule } from '../../ui/ui.module';
import { CartService } from '../../core/service/cart-service';
import { Observable } from 'rxjs';
import { TicketItem } from '../../core/model/menu-item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resume',
  imports: [BackButtonComponent, UiModule, CommonModule, RouterModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {

   public total$: Observable<number>;
   public items$: Observable<TicketItem[]>;

  constructor(private cart: CartService) {
    this.total$ = this.cart.total$;
    this.items$ = this.cart.items$;
  }


 }
