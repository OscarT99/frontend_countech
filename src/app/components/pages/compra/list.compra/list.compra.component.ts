import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CompraService } from 'src/app/services/compra/compra.service'; 
import { CompraInstance } from 'src/app/interfaces/compra/compra.interface'; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';


@Component({
    templateUrl: './list.compra.component.html',
    
})
export class ListCompraComponent implements OnInit {
    listCompras: CompraInstance[] = []
    compra: CompraInstance = {}
    id:number=0;

    mostrarModalDetalle: boolean = false;
    compraIdSeleccionado!: number;
    detalleCompra: any; // Puedes ajustar esto según la estructura de tu pedido
    @ViewChild('detalleCompraModal') detallePedidoCompra!: Dialog;
   
    rowsPerPageOptions = [5, 10, 15];


    constructor(
      private _compraService:CompraService,
      private toastr: ToastrService,      
      private aRouter:ActivatedRoute,
      private router : Router,
      ){}

    ngOnInit():void {        
        this.getListCompras()                                
    }

    
    getListCompras(){     
        this._compraService.getListCompras().subscribe((data:any) =>{      
          this.listCompras = data.listaCompras;          
        })        
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
        
    editarCompra(id: number): void {
        this.router.navigate(['/pages/compra/add', id]);
      }
      
}
