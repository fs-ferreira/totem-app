import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../core/service/cart-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../core/model/confirm-dialog-model';

@Component({
  selector: 'total-display',
  imports: [CommonModule, UiModule, RouterModule],
  template: `
    @if(showTotalDisplay){
      <div class="fixed top-2 left-1/2 transform -translate-x-1/2 text-center font-bold text-2xl text-(--mat-sys-primary)">
        <span>{{ total$ | async | currency }}</span>
      </div>

      <div class="!fixed top-2 right-5 flex items-center gap-2">
        <button [disabled]="(total$ | async) === 0" (click)="handleClearCart()" matIconButton aria-label="Clear cart button"
          class="!text-(--mat-sys-error) disabled:!text-(--mat-sys-outline) !transition-all !delay-200 ">
            <mat-icon>block</mat-icon>
        </button>
        <button [disabled]="(total$ | async) === 0" [routerLink]="'/resume'" matButton="filled" aria-label="Finish order button"
          class="disabled:!text-(--mat-sys-outline) !transition-all !delay-200 !rounded-xl ring !px-4">
            Finalizar
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TotalDisplayComponent {
  public allowedRoutes: string[] = ['menu', 'menu/:id'];

  public total$: Observable<number>;

  constructor(private cart: CartService, public router: Router, private dialog: MatDialog) {
    this.total$ = this.cart.total$;
  }

  get showTotalDisplay(): boolean {
    const url = this.router.url.split('?')[0];
    return this.allowedRoutes.some(path =>
      this.matchRoute(url, path)
    );
  }

  private matchRoute(url: string, path: string): boolean {
    if (path.includes(':')) {
      const base = path.split('/:')[0];
      return url.startsWith('/' + base);
    }
    return url === '/' + path;
  }

  public handleClearCart() {
    this.openConfirm();
  }

  openConfirm() {
    const data: ConfirmDialogData = {
      title: 'Cancelar pedido',
      message: 'Tem certeza que deseja cancelar seu pedido?',
      confirmText: 'Ok',
      cancelText: 'Cancelar',
    };

    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.cart.handleClearOrder();
          this.router.navigate(['./'])
        }
      });
  }
}

