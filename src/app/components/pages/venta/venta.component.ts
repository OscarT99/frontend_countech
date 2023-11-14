import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta } from 'src/app/interfaces/venta/venta.interface';
import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';




@Component({
  templateUrl: './venta.component.html',

})
export class VentaComponent implements OnInit {
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


  productDialog: boolean = false;


  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  rowsPerPageOptions = [5, 10, 15];


  constructor(private fb: FormBuilder,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router,

  ) {
    this.formVenta = this.fb.group({
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

  navigateToAbonoVenta() {
    this.router.navigate(['pages/abonoVenta']);
  }

  ngOnInit(): void {
    this.getListVentas()
    this.getListClientes()
  }

  getListClientes() {
    this._clienteService.getListClientes().subscribe((data: any) => {
      this.listClientes = data.listClientes;
    })
  }

  getNombreCliente(clienteId: number): string {
    const cliente = this.listClientes.find(c => c.id === clienteId);
    return cliente?.nombreComercial || 'Cliente no encontrado';
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
        cliente: ['', Validators.required],
        ordenTrabajo: ['', Validators.required],
        fechaVenta: ['', Validators.required],
        formaPago: ['', Validators.required],
        valorTotal: ['', Validators.required],
        estadoPago: ['', Validators.required],
      })
      this.formVenta.setValue({
        cliente: data.cliente,
        ordenTrabajo: data.ordenTrabajo,
        fechaVenta: data.fechaVenta,
        formaPago: data.formaPago,
        valorTotal: data.valorTotal,
        estadoPago: data.estadoPago
      })
    })
  }


  addVenta() {
    const venta: Venta = {
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
        this.productDialog = false;
        this.toastr.info(`La venta fue actualizada con éxito`, `Venta actualizado`)
        this.getListVentas();
      })
    }

    this.productDialog = false;
  }

  editProduct(id: number) {
    this.id = id;
    this.productDialog = true;
    this.getVenta(id)
  }

  hideDialog() {
    this.productDialog = false;
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


}
