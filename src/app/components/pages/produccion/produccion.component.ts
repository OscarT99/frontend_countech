import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Pedido } from 'src/app/interfaces/pedido/pedido.interface';
import { PedidoService } from 'src/app/services/pedido/pedido.service'; 

@Component({
  templateUrl: './produccion.component.html',
})
export class ProduccionComponent implements OnInit {

  listPedidos: Pedido[] = [];

  constructor(private _pedidoService: PedidoService) { }

  ngOnInit():void {
    this.getListPedidos();
  }
  

  getListPedidos() {
    this._pedidoService.getListPedidos().subscribe((data : any) => {
      this.listPedidos = data.listaPedidos;
      console.log(data.listPedidos)
    });
  }

}
