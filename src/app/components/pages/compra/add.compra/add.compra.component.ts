import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { v4 as uuidv4 } from 'uuid';

import { CompraService } from 'src/app/services/compra/compra.service'; 
import { CompraInstance } from 'src/app/interfaces/compra/compra.interface';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service'; 
import { DetalleCompraInstance } from 'src/app/interfaces/compra/detalleCompra.interface';
import { Proveedor } from 'src/app/interfaces/proveedor/proveedor.interface';
import { InsumoService } from 'src/app/services/insumo/insumo.service';
import { InsumoInstance } from 'src/app/interfaces/insumo/insumo.interface';

@Component({
  templateUrl: './add.compra.component.html',
})
export class AddCompraComponent implements OnInit {
  
  id: number = 0;
  proveedores: Proveedor[] = [];
  sugerenciasProveedores: Proveedor[] = [];
  insumos:InsumoInstance[]=[]
  sugerenciasInsumos:InsumoInstance[]=[];
  campoBusqueda: string = '';

  formaPago: SelectItem[] = [
    { label: 'Crédito', value: 'Crédito' },
    { label: 'Contado', value: 'Contado' }
  ];

  formCompra:FormGroup;
  detallesInsumo: DetalleCompraInstance[] = [];

  impuestos: { label: string, value: number }[] = [
    { label: '', value: 0 }, 
    { label: '19%', value: 0.19 },
    { label: '5%', value: 0.05 }
    ];
    
  formasDePago:{label:string, value:string}[]= [
    {label:'Crédito',value:'Crédito'},
    {label:'Contado',value:'Contado'}
  ]

    constructor(private fb: FormBuilder,
    private _compraService: CompraService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _proveedorService: ProveedorService,
    private _insumoService: InsumoService,
    private router : Router,
  ) {
    this.formCompra=this.fb.group({
        proveedor:['',Validators.required],
        contacto:['',Validators.required],
        insumo:['',Validators.required],
        cantidad:[0,Validators.required],
        valorUnitario:[0,Validators.required],
        ivaInsumo:['',Validators.required],
        totalBruto:['',Validators.required],
        ivaTotal:['',Validators.required],
        totalNeto:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.aRouter.params.subscribe(params => {
      this.id = +params['id'];

      if (this.id !== 0) {
        this.getCompra(this.id)
        this.obtenerListaInsumos()  
        this.obtenerListaProveedores()
                        
      } else {
        this.obtenerListaInsumos()    
        this.obtenerListaProveedores()    
      }
    });
  }

  getCompra(id:number){
    this._compraService.getCompra(id).subscribe((data:CompraInstance) => {        
      console.log(data)      
    })
  }
         
  agregarInsumo(): void{
    const insumo = this.formCompra.value.insumo;
    const cantidad = this.formCompra.value.cantidad;
    const valorUnitario = this.formCompra.value.valorUnitario;
    const impuestoIva = this.formCompra.value.ivaInsumo.value;
    const valorIva = valorUnitario*impuestoIva;

    if(!insumo || !cantidad || !valorUnitario){
        this.toastr.warning('Complete los campos requeridos.');
        return;
    }

    const nuevoInsumoInstance: DetalleCompraInstance = {
        insumo:insumo,
        cantidad:cantidad,
        valorUnitario:valorUnitario,
        impuestoIva:valorIva,
        valorTotal:cantidad*(valorUnitario+valorIva)
    }
    

    this.detallesInsumo.push(nuevoInsumoInstance)
    
    this.formCompra.get('totalBruto')!.setValue(this.calcularTotalBruto());
    this.formCompra.get('ivaTotal')!.setValue(this.calcularIvaTotal());
    this.formCompra.get('totalNeto')!.setValue(this.calcularTotalNeto());

    this.formCompra.get('insumo')!.reset();
    this.formCompra.get('cantidad')!.reset();
    this.formCompra.get('valorUnitario')!.reset();
    this.formCompra.get('iva')!.reset();
  }

  calcularTotalBruto(): number {
    return this.detallesInsumo.reduce((total, detalle) => total + (detalle.cantidad! * detalle.valorUnitario!), 0);
}

// Método para calcular ivaTotal
calcularIvaTotal(): number {
    return this.detallesInsumo.reduce((total, detalle) => total + detalle.impuestoIva!, 0);
}

// Método para calcular totalNeto
calcularTotalNeto(): number {
    const totalBruto = this.formCompra.value.totalBruto;
    const ivaTotal = this.formCompra.value.ivaTotal;
    return totalBruto + ivaTotal;
}

  obtenerListaProveedores(): void {
    this._proveedorService.getListProveedoresCompra().subscribe(
      (data: { listProveedores: Proveedor[] }) => {
        this.sugerenciasProveedores = data.listProveedores;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  buscarProveedores(event: any): void {
      this.sugerenciasProveedores = this.filterProveedores(event.query);
  }
  
  filterProveedores(query: string): Proveedor[] {
    return this.sugerenciasProveedores.filter(
      (proveedor) =>
        proveedor.razonSocial!.toLowerCase().includes(query.toLowerCase()) ||
        proveedor.nombreComercial!.toLowerCase().includes(query.toLowerCase()) ||
        proveedor.numeroIdentificacion!.toLowerCase().includes(query.toLowerCase())
    );
  }

  seleccionarProveedor(event: any): void {
    const proveedorId = event.value.id;
    this.formCompra.get('proveedor')!.setValue(proveedorId);
  
    const proveedorSeleccionado = this.sugerenciasProveedores.find(c => c.id === proveedorId);
  
    if (proveedorSeleccionado) {
      this.formCompra.get('contacto')!.setValue(proveedorSeleccionado.contacto || '');
    }
  }
  
  
  
  obtenerListaInsumos(): void {
    this._insumoService.getListInsumosCompra().subscribe(
      (data: { listInsumos: InsumoInstance[] }) => {
        this.sugerenciasInsumos = data.listInsumos;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  buscarInsumos(event: any): void {
    this.sugerenciasInsumos = this.filterInsumos(event.query);
  }
  
  filterInsumos(query: string): InsumoInstance[] {
    return this.sugerenciasInsumos.filter(
      (insumo) =>
        insumo.nombre!.toLowerCase().includes(query.toLowerCase()) 
    );
  }

  seleccionarInsumo(event: any): void {
    const insumoId = event.value.id;
    this.formCompra.get('insumo')!.setValue(insumoId);
  }
}
