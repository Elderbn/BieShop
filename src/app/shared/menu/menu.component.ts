import { Component, Injector, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../../lib/base-component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menus:any;
  total:any;
  tongtien:any;
  cartitems:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.tongtien = 0;
    this._api.get('/api/itemgroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
    this._cart.items.subscribe((res) => {
      this.cartitems = res;
      this.total = 0;
      for(let x of this.cartitems){ 
        x.money = Number.parseInt(x.quantity) *  Number.parseInt(x.item_price);
        this.tongtien += x.quantity * x.item_price;
      } 
    });

    this._cart.items.subscribe((res) => {
      this.total = res? res.length:0;
    });
  }
  deleteCart(item){

    this._cart.deleteItem(item.item_id);
    for(let x of item){ 
      x.money = Number.parseInt(x.quantity) *  Number.parseInt(x.item_price);
      this.tongtien += x.quantity * x.item_price;
    } 
  }

}
