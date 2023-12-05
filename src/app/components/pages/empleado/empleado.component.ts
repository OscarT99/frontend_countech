import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service'; 
import { Empleado } from 'src/app/interfaces/empleado/empleado.interface';
import { NgIf } from '@angular/common';


@Component({
  templateUrl: './empleado.component.html',
  providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

  listEmpleados: Empleado[] = [];

  empleado: Empleado = {};

  empleadoSeleccionado: Empleado | null = null;

  empleadoDialog: boolean = false;

  changeStateDialog: boolean = false;

  selectedProduct!: Empleado;

  submitted: boolean = false;

  cols: any[] = [];

  tipoIdentidad: any[] = [];

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  constructor(private _empleadoService: EmpleadoService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.getListEmpleados();

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
  ];

  this.tipoIdentidad = [
    { label: 'Cédula de ciudadanía', value: 'CC' },
    { label: 'Cédula de ciudadanía', value: 'CC' },
    { label: 'Cédula de extranjería', value: 'CE' },
  ];

  }

  saveProduct() {
    this.submitted = true;
  }
  hideDialog() {
    this.empleadoDialog = false;
    this.submitted = false;
  }

  nuevoEmpleado() {
    this.empleado = {};
    this.submitted = false;
    this.empleadoDialog = true;
  }

  cambiarEstado(empleado: Empleado) {
    this.changeStateDialog = true;
    this.empleadoSeleccionado = empleado;
  }

  confirmChangeState(confirmacion: boolean) {
    if (confirmacion && this.empleadoSeleccionado) {
      if (this.empleadoSeleccionado.idEmpleado){
        this._empleadoService.putEmpleado(this.empleadoSeleccionado.idEmpleado, this.empleadoSeleccionado).subscribe(() => {
          this.empleado.estado = !this.empleado.estado;
          if (this.empleado.estado == false) {
          this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Empleado activo', life: 3000 });
          } else{
          this.messageService.add({ severity: 'success', summary: 'Completado', detail: 'Empleado inactivo', life: 3000 });
          }
          this.getListEmpleados();
        });
      }
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado', life: 3000 });
      this.getListEmpleados();
    }
    this.changeStateDialog = false;
  }

  
  editProduct(empleado: Empleado) {
    this.empleado = { ...empleado };
    this.empleadoDialog = true;
  }

  getListEmpleados() {
    this._empleadoService.getListEmpleados().subscribe((data: any) => {
      this.listEmpleados = data.listEmpleados;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

 }

