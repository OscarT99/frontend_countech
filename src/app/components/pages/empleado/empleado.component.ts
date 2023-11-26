import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service'; 
import { Empleado } from 'src/app/interfaces/empleado/empleado.interface';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './empleado.component.html',
})
export class EmpleadoComponent implements OnInit {

  listEmpleados: Empleado[] = [];

  constructor(private _empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.getListEmpleados();
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

