import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta } from 'src/app/interfaces/venta/venta.interface';
import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { AbonoVenta } from 'src/app/interfaces/abonoVenta/abonoVenta.interface';
import { AbonoVentaService } from 'src/app/services/abonoVenta/abonoVenta.service';
import { AbonoVentaComponent } from '../abonoVenta/abonoVenta.component'; 
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';




@Component({
  templateUrl: './venta.component.html',
  providers: [ConfirmationService, MessageService]

})
export class VentaComponent implements OnInit {
  
  listAbonoVentas: AbonoVenta [] = []
  abonoVenta: AbonoVenta = {}
  listVentas: Venta[] = []
  listClientes: Cliente[] = []
  venta: Venta = {}
  formVenta: FormGroup;
  id: number = 0;

  valSwitch: boolean = false;
  showConfirmationDialog: boolean = false;
  ventaSeleccionado: Venta | null = null;
  switchState: boolean | undefined = undefined;


  estadoPago: SelectItem[] = [
    { label: 'Pago', value: 'Pago' },
    { label: 'Pendiente', value: 'Pendiente' }
  ];
  selectedEstadoPago: SelectItem = { value: '' };


  value8: any;
  value9: any;


  productDialogAbono: boolean = false;
  productDialogDetalle: boolean = false;



  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  rowsPerPageOptions = [5, 10, 15];


  constructor(private fb: FormBuilder,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private _abonoVentaService: AbonoVentaService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,


  ) {
    this.formVenta = this.fb.group({
      id: ['', Validators.required],
      cliente: ['', Validators.required],
      ordenTrabajo: ['', Validators.required],
      fechaVenta: ['', Validators.required],
      formaPago: ['', Validators.required],
      valorTotal: ['', Validators.required],
      estadoPago: ['', Validators.required],
    })
    this.aRouter.params.subscribe(params => {
      this.id = +params['id'];
    });
  }



  ngOnInit(): void {
    this.getListVentas()
    this.getListClientes()
    this.getListAbonoVentas()
  }

  getListClientes() {
    this._clienteService.getListClientes().subscribe((data: any) => {
      this.listClientes = data.listClientes;
    })
  }

  getNombreCliente(clienteId?: number): string {
    if (clienteId === undefined) {
      return 'Cliente no encontrado';
    }
  
    const cliente = this.listClientes.find(c => c.id === clienteId);
  
    return cliente ? cliente.nombreComercial || 'Nombre no disponible' : 'Cliente no encontrado';
  }
  
  

  getListVentas() {
    this._ventaService.getListVentas().subscribe((data: any) => {
      this.listVentas = data.listVentas;
    })
  }

  getVenta(id: number) {
    this._ventaService.getVenta(id).subscribe((data: Venta) => {
      console.log(data)

      this.formVenta = this.fb.group({
        id: ['', Validators.required],
        cliente: ['', Validators.required],
        ordenTrabajo: ['', Validators.required],
        fechaVenta: ['', Validators.required],
        formaPago: ['', Validators.required],
        valorTotal: ['', Validators.required],
        estadoPago: ['', Validators.required],
      })
      this.formVenta.setValue({
        id: data.id,
        cliente: data.cliente,
        ordenTrabajo: data.ordenTrabajo,
        fechaVenta: data.fechaVenta,
        formaPago: data.formaPago,
        valorTotal: data.valorTotal,
        estadoPago: data.estadoPago
      })

      this.venta = data; // Actualiza la variable de la venta con los datos recuperados
      
      // Verifica si la venta tiene un cliente asociado
      if (this.venta.cliente) {
        // Aquí puedes llamar a una función que recupere el nombre del cliente
        this.getNombreCliente(this.venta.cliente);
      }

    })
  }


  addVenta() {
    const venta: Venta = {
      id: this.formVenta.value.id,
      cliente: this.formVenta.value.cliente,
      ordenTrabajo: this.formVenta.value.ordenTrabajo,
      fechaVenta: this.formVenta.value.fechaVenta,
      formaPago: this.formVenta.value.formaPago,
      valorTotal: this.formVenta.value.valorTotal,
      estadoPago: this.formVenta.value.estadoPago
    }

    if (this.id !== 0) {
      venta.id = this.id
      this._ventaService.putVenta(this.id, venta).subscribe(() => {
        this.productDialogAbono = false;
        this.toastr.info(`La venta fue actualizada con éxito`, `Venta actualizado`)
        this.getListVentas();
      })
    }

    this.productDialogAbono = false;
  }


  navigateToVentaList() {
    // Lógica para cargar la lista de ventas actualizada
    // ...
    // Navegar a la ruta donde se encuentra la lista de ventas actualizada
    this.getListVentas();

    //this.router.navigate(['/pages/venta']);
}



  openNew() {
    this.id = 0;                
    this.formVenta.reset()
    this.productDialogAbono = true;
}


  confirm2(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: '¿Está seguro de realizar el abono?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Llama a la función para agregar el abono de venta con el valor actual del input
        this.agregarAbonoVenta(this.value9);
        console.log(this.getValorRestante())
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'El abono no fue agregado a la venta'
        });
      }
    });
  }
  



  hideDialog() {
    this.productDialogAbono = false;
    this.productDialogDetalle = false;

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  exportToExcel() {
    const data: any[] = []; // Array para almacenar los datos

    // Agregar encabezados a la matriz de datos
    const headers = [
      'Cliente',
      'Orden de Trabajo',
      'Fecha de Venta',
      'Forma de Pago',
      'Valor Total',
      'Estado de Pago'
    ];

    data.push(headers);

    this.listVentas.forEach(venta => {
      const row = [
        venta.cliente,
        venta.ordenTrabajo,
        venta.fechaVenta,
        venta.formaPago,
        venta.valorTotal,
        venta.estadoPago ? 'Pago' : 'Pendiente'
      ];

      data.push(row);
    });

    // Crear un libro de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');

    // Guardar el libro de Excel como archivo
    XLSX.writeFile(wb, 'ventas.xlsx');
  }

  
  

  //ABONO VENTA

  //Listar Abonos
  getListAbonoVentas() {
    if (this.id !== 0) {
      this._abonoVentaService.getListAbonoVentas().subscribe((data: any) => {
        this.listAbonoVentas = data.listAbonoVentas.filter((abono: AbonoVenta) => abono.venta === this.id);
      });
    }
  }
  
  

  //Agregar abono 
  agregarAbonoVenta(valorAbono: number) {
    const nuevoAbono: AbonoVenta = {
      // Aquí debes construir el objeto del abono de venta con los datos necesarios
      // Por ejemplo:
      valorAbono: valorAbono,
      fechaAbono: new Date(), // Puedes ajustar esto según la fecha que necesites
      venta: this.id // Asigna el ID de la venta correspondiente
    };
  
    this._abonoVentaService.postAbonoVenta(nuevoAbono).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Agregado',
          detail: 'El abono se agregó exitosamente a la venta'
        });
        this.getListAbonoVentas(); // Actualiza la lista de abonos de venta después de agregar uno nuevo
        //this.hideDialog(); // Cierra el diálogo después de agregar el abono de venta
      },
      (error) => {
        console.error('Error al agregar abono de venta:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al agregar el abono a la venta'
        });
      }
    );
  }
  

  newAbonoVenta(id: number) {
    this.id = id;
    this.productDialogAbono = true;
    this.getVenta(id);
    
    // Filtra los abonos por la venta seleccionada
    this.filtrarAbonosPorVenta(id);
    this.getListAbonoVentas();
  }


  //Listar abonos de la venta seleccionada
  filtrarAbonosPorVenta(ventaId: number) {
    // Filtra la lista de abonos para mostrar solo los abonos asociados a la venta seleccionada
    this.listAbonoVentas = this.listAbonoVentas.filter(abono => abono.venta === ventaId);
  }
  
  
  getValorRestante(): number {
    if (this.abonoVenta.valorAbono && typeof this.venta.valorTotal === 'number') {
      const abonosTotal = this.listAbonoVentas.reduce((total, abono) => total + (abono.valorAbono || 0), 0);
      return this.venta.valorTotal - abonosTotal;
    }
    return 0; // O cualquier otro valor predeterminado en caso de que no haya datos válidos
  }
  


  //DETALLE VENTA
  detalleVenta(id: number) {
    this.id = id;
    this.productDialogDetalle = true;
    this.getVenta(id);
    // Filtra los abonos por la venta seleccionada
    this.filtrarAbonosPorVenta(id);
    this.getListAbonoVentas();
  }
  
}
