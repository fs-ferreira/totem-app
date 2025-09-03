import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem, TicketItem } from '../model/menu-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cart_total';
  private readonly ITEMS_KEY = 'cart_items';
  private readonly PRINT_API_URL = "http://localhost:3000/"

  private _total$ = new BehaviorSubject<number>(this.loadTotal());
  total$ = this._total$.asObservable();

  private _items$ = new BehaviorSubject<TicketItem[]>(this.loadItems());
  items$ = this._items$.asObservable();

  private httpClient = inject(HttpClient)

  getTotal(): number {
    return this._total$.getValue();
  }

  private setTotal(value: number) {
    this._total$.next(value);
    localStorage.setItem(this.STORAGE_KEY, value.toString());
  }

  addToTotal(value: number) {
    const newTotal = this.getTotal() + value;
    this.setTotal(newTotal);
  }

  private loadTotal(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? parseFloat(stored) : 0;
  }

  handleClearOrder() {
    this.resetTotal();
    this.resetItems();
  }

  private resetTotal() {
    this.setTotal(0);
  }

  private resetItems() {
    this.setItems([]);
  }


  /** ITEMS LOGIC **/
  getItems(): TicketItem[] {
    return this._items$.getValue();
  }

  private setItems(items: TicketItem[]) {
    this._items$.next(items);
    localStorage.setItem(this.ITEMS_KEY, JSON.stringify(items));
  }

  addToOrder(dataSource: MenuItem[]) {
    const items = this.getItems();

    dataSource.forEach(parent => {
      let idx!: number;
      let item!: TicketItem;
      let quantityToAdd!: number;
      const hasChildren = !!parent.children?.length
      if (!hasChildren && parent.quantity) {
        item = {
          name: parent.name,
          quantity: parent.quantity,
          price: parent.price!,
        }
        idx = items.findIndex(filter => filter.name == parent.name);
        quantityToAdd = parent.quantity;
        if (idx !== -1) {
          this.updateItemQuantity(idx, quantityToAdd)
        } else {
          items.push(item)
        }
      } else {
        parent.children?.forEach(child => {
          if (!child.quantity) return
          item = {
            name: parent.name,
            type: child.name,
            quantity: child.quantity,
            price: parent.price!,
          }
          idx = items.findIndex(filter => filter.name == parent.name && filter.type == child.name);
          quantityToAdd = child.quantity;
          if (idx !== -1) {
            this.updateItemQuantity(idx, quantityToAdd)
          } else {
            items.push(item)
          }
        })
      }
      this.setItems(items);
    })
  }

  updateItemQuantity(index: number, quantity: number) {
    const items = this.getItems();
    if (items[index]) {
      items[index].quantity += quantity;
      this.setItems(items);
    }
  }

  private loadItems(): TicketItem[] {
    const stored = localStorage.getItem(this.ITEMS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  printOrder(){
    return this.httpClient.post(this.PRINT_API_URL + 'print', this.loadItems())
  }
}
