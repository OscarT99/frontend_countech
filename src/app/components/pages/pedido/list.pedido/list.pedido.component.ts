import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { PedidoService } from 'src/app/services/pedido/pedido.service'; 
import { Pedido } from 'src/app/interfaces/pedido/pedido.interface'; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: './list.pedido.component.html',
    
})
export class ListPedidoComponent implements OnInit {
    listPedidos: Pedido[] = []
    pedido: Pedido = {}
    id:number=0;
   
    rowsPerPageOptions = [5, 10, 15];


    constructor(
      private _pedidoService:PedidoService,
      private toastr: ToastrService,      
      private aRouter:ActivatedRoute,
      ){}

    ngOnInit():void {        
                                      
    }

    
    getListPedidos(){     
        this._pedidoService.getListPedidos().subscribe((data:any) =>{      
          this.listPedidos = data.listaPedidos;          
        })        
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
        
}
