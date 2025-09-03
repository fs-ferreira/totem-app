import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../core/model/menu-item';
import { CartService } from '../../../core/service/cart-service';
import { UiModule } from '../../../ui/ui.module';
import { loadMenu } from '../../../utils/menu-reader';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';

@Component({
  selector: 'app-sub-item-list',
  imports: [UiModule, CommonModule, BackButtonComponent],
  styleUrl: './sub-item-list.component.scss',
  templateUrl: './sub-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubItemListComponent implements OnInit, OnDestroy {
  public dataSource: MenuItem[] = [];

  private activatedRoute = inject(ActivatedRoute)
  private cdref = inject(ChangeDetectorRef)
  private cartService = inject(CartService)

  ngOnInit(): void {
    this.setupDataSource()
  }

  private async setupDataSource() {
    const type = this.activatedRoute.snapshot.paramMap.get('id');
    if (!type) {
      return;
    }
    this.dataSource = await loadMenu(type);
    
    this.cdref.markForCheck();
    this.setLocalIndexes(this.dataSource)
  }

  ngOnDestroy(): void {
    this.resetQuantities(this.dataSource);
  }


  public childrenAccessor = (node: MenuItem) => node.children ?? [];

  public hasChild = (_: number, node: MenuItem) => !!node.children && node.children.length > 0;

  public increase(node: MenuItem) {
    node.quantity = (node.quantity ?? 0) + 1;
  }

  public decrease(node: MenuItem) {
    if ((node.quantity ?? 0) > 0) {
      node.quantity--;
    }
  }

  public handleClear() {
    this.resetQuantities(this.dataSource)
  }

  public handleConfirm() {
    this.cartService.addToOrder(this.dataSource)
    this.cartService.addToTotal(this.total)
    this.resetQuantities(this.dataSource)
  }

  get total() {
    return this.sumNodes(this.dataSource);
  }

  private sumNodes(nodes: MenuItem[], parentPrice?: number): number {
    return nodes.reduce((acc, node) => {
      const nodeValue = ((node.price || parentPrice) ?? 0) * (node.quantity ?? 0);
      const childrenValue = node.children ? this.sumNodes(node.children, node.price) : 0;
      return acc + nodeValue + childrenValue;
    }, 0);
  }

  private resetQuantities(nodes: MenuItem[]): void {
    for (const node of nodes) {
      node.quantity = 0;
      if (node.children) {
        this.resetQuantities(node.children);
      }
    }
  }

  private setLocalIndexes(nodes: MenuItem[]) {
    nodes.forEach((node) => {
      if (node.children?.length) {
        node.children.forEach((child: MenuItem, i: number) => {
          child.localIndex = i;
        });
        this.setLocalIndexes(node.children);
      }
    });
  }

}