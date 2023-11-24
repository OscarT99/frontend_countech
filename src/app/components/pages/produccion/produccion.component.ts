import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './produccion.component.html',

})
export class ProduccionComponent implements OnInit {

  routeItems: MenuItem[] = [];  

  ngOnInit() {
  this.routeItems = [
    { label: 'Personal', routerLink: 'personal' },
    { label: 'Seat', routerLink: 'seat' },
    { label: 'Payment', routerLink: 'payment' },
    { label: 'Confirmation', routerLink: 'confirmation' },
  ];
  }
}
