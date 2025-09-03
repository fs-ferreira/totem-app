import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { Router } from '@angular/router';
import { CartService } from '../../core/service/cart-service';

@Component({
  selector: 'app-payment-step',
  imports: [UiModule],
  templateUrl: './payment-step.component.html',
  styleUrl: './payment-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStepComponent implements OnInit {

  public hasPaymentFinished: boolean = false
  private cdref = inject(ChangeDetectorRef);
  private router = inject(Router);
  private service = inject(CartService);


  ngOnInit() {
    this.startPaymentTimer();
  }

  startPaymentTimer() {
    setTimeout(() => {
      this.hasPaymentFinished = true;
      this.cdref.markForCheck();
      this.service.printOrder().subscribe((result) => {
        console.warn(result);
        
      });
    }, 5000);

    setTimeout(() => {
      this.router.navigate([''])
    }, 10000);

  }
}
