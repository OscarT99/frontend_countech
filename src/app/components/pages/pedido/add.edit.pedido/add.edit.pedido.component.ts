// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute } from '@angular/router';
// import { SelectItem } from 'primeng/api';

// import { PedidoService } from 'src/app/services/pedido/pedido.service';
// import { Pedido } from 'src/app/interfaces/pedido/pedido.interface'; 

// import { ClienteService } from 'src/app/services/cliente/cliente.service';
// import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';

// @Component({
//     templateUrl: './add.edit.pedido.component.html',
// })
// export class AddEditPedidoComponent implements OnInit, AfterViewInit{
//   referenciaInput: HTMLInputElement | null = null;
//   descripcionInput: HTMLInputElement | null = null;
//   valorUnitarioInput: HTMLInputElement | null = null;
//   referenciasTableBody: HTMLElement | null = null;
//   private totalCantidadTotal: number = 0;


//     listPedidos: Pedido[] = [];
//     pedido: Pedido = {};
//     id: number = 0;

//     // Corrige la asignación inicial de clienteSeleccionado
//     clienteSeleccionado: Cliente | null = null;
//     clientes: Cliente[] = [];
//     sugerenciasClientes: Cliente[] = []; // Nueva variable para mantener las sugerencias de clientes
//     campoBusqueda: string = '';


//     procedimiento: string = '';   
//     tipoMaquina: SelectItem[] = [
//       {label:'Fileteadora',value:'Fileteadora'},
//       {label:'Plana',value:'Plana'},
//       {label:'Presilladora',value:'Presilladora'},
//       {label:'Recubridora',value:'Recubridora'},
//       {label:'Manual',value:'Manual'}
//     ];

//     formaPago: SelectItem[] = [
//       {label:'Credito',value:'Credito'},
//       {label:'Contado',value:'Contado'}
//     ]


//     procedimientos: { procedimiento: string, tipoMaquina: string }[] = [];

//     constructor(
//         private _pedidoService: PedidoService,
//         private toastr: ToastrService,
//         private aRouter: ActivatedRoute,
//         private _clienteService: ClienteService
//     ) {}

//     ngOnInit(): void {      
//         this.obtenerListaClientes();      
//     }

//     ngAfterViewInit(): void {
//       this.referenciaInput = document.getElementById("referencia") as HTMLInputElement;
//       this.descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
//       this.valorUnitarioInput = document.getElementById("valorUnitario") as HTMLInputElement;
//       this.referenciasTableBody = document.getElementById("referenciasTableBody");
//     }

//     // Función para obtener la lista de clientes
//     obtenerListaClientes(): void {
//         this._clienteService.getListClientesPedido().subscribe(
//             (data: { listClientes: Cliente[] }) => {
//                 this.clientes = data.listClientes;
//                 this.sugerenciasClientes = this.clientes.slice(); // Inicializa sugerenciasClientes con la lista completa
//                 console.log('Clientes:', this.clientes);
//             },
//             (error: any) => {
//                 console.error(error);
//             }
//         );
//     }

//     // Función para buscar clientes según la entrada del usuario
//     buscarClientes(event: { query: string }): void {
//       this.campoBusqueda = event.query;

//       // Filtra la lista completa de clientes para obtener las sugerencias
//       this.sugerenciasClientes = this.clientes.filter(cliente =>
//           cliente.nombreComercial!.toLowerCase().includes(this.campoBusqueda.toLowerCase()) ||
//           cliente.razonSocial!.toLowerCase().includes(this.campoBusqueda.toLowerCase()) ||
//           cliente.numeroIdentificacion!.toLowerCase().includes(this.campoBusqueda.toLowerCase())
//       );
//     }

//     agregarProcedimiento(): void {      
//       if (this.procedimiento && this.tipoMaquina && this.tipoMaquina.length > 0) {    
//         const tipoMaquinaSeleccionada = this.tipoMaquina[0].value;  // Obtén el valor de la opción seleccionada
//         this.procedimientos.push({ procedimiento: this.procedimiento, tipoMaquina: tipoMaquinaSeleccionada });
//         this.procedimiento = '';
//         this.tipoMaquina = [];
//       } else {
//         console.error('Ambos campos son obligatorios.');
//       }
//     }

//     agregarReferencia() {
//       const referencia = this.referenciaInput!.value;
//       const descripcion = this.descripcionInput!.value;      
//       const valorUnitario = this.valorUnitarioInput!.value;
//       const nuevaFila = document.createElement("tr");

//       nuevaFila.innerHTML = `
//         <td>${referencia}</td>
//         <td>${descripcion}</td>
//         <td>${valorUnitario}</td>
//         <td class="unidades-cell">0</td>
//         <td class="total-cell">0</td>
//         <td>
//           <button class="btn btn-info btn-sm agregarColor">Agregar Color</button>
//           <button class="btn btn-warning btn-sm eliminarFila">Eliminar</button>
//         </td>
//       `;


//       if (this.referenciasTableBody) {
//         this.referenciasTableBody.appendChild(nuevaFila);
//       } else {
//         console.error("Error: referenciasTableBody es null.");
//       }

//       this.referenciaInput!.value = "";
//       this.descripcionInput!.value = "";      
//       this.valorUnitarioInput!.value = "";

//       // Agrega manejadores de eventos a los botones "Agregar Color" y "Eliminar"
//       const agregarColorButtons = nuevaFila.querySelectorAll('.agregarColor');
//       const eliminarFilaButtons = nuevaFila.querySelectorAll('.eliminarFila');

//       agregarColorButtons.forEach(button => {
//         button.addEventListener('click', () => this.agregarColor(nuevaFila));
//       });

//       eliminarFilaButtons.forEach(button => {
//         button.addEventListener('click', () => this.eliminarFila(nuevaFila));
//       });

//       const unidadesCell = nuevaFila.querySelector(".unidades-cell");
//       unidadesCell!.addEventListener("input", () => {
//       this.actualizarTotal(nuevaFila);
//     });
//     }

//     actualizarTotal(fila: HTMLElement) {
//       const unidadesCell = fila.querySelector(".unidades-cell");
//       const totalCell = fila.querySelector(".total-cell");
//       const valor = parseFloat(fila.querySelector("td:nth-child(3)")?.textContent || "0");
//       const unidades = parseInt(unidadesCell?.textContent || "0"); // Obtener unidades desde "unidades-cell"

//       const total = unidades * valor;
//       totalCell!.textContent = total.toString();
//     }

//     actualizarTotalNeto() {
//       const totalNetoInput = document.getElementById('totalNeto') as HTMLInputElement;

//       if (totalNetoInput) {
//         const totalCells = document.querySelectorAll('.total-cell');
//         let totalNeto = 0;

//         totalCells.forEach((cell) => {
//           totalNeto += parseFloat(cell.textContent || '0');
//         });

//         totalNetoInput.value = totalNeto.toString();
//       }
//     }

//     agregarColor(fila: HTMLElement) {
//       const referencia = fila.querySelector("td:first-child")?.textContent;

//       // Verificar si ya existe una tabla de colores/tallas para esta referencia
//       const tablaExistente = fila.nextElementSibling;

//       if (tablaExistente && tablaExistente.classList.contains("color-table")) {
//         // Ya existe una tabla, no hagas nada
//         return;
//       }

//       const tablaColor = document.createElement("table-bordered");
//       tablaColor.classList.add("color-table");

//       tablaColor.innerHTML = `
//         <table class="table table-bordered">
//         <thead>
//         <tr>
//           <th>Color/Talla</th>
//           <th>S</th>
//           <th>M</th>
//           <th>L</th>
//           <th>XL</th>
//           <th>CantidadTotal</th>
//           <th>Acciones</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td contenteditable="true" class="color-talla-cell"></td>
//           <td contenteditable="true" class="s-cell"></td>
//           <td contenteditable="true" class="m-cell"></td>
//           <td contenteditable="true" class="l-cell"></td>
//           <td contenteditable="true" class="xl-cell"></td>
//           <td class="cantidad-total-cell">0</td>
//           <td>
//             <button class="btn btn-danger btn-sm eliminarFila" >Eliminar</button>
//           </td>
//         </tr>
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colspan="5" style="text-align: right;">
//             <strong>Cantidad Total:</strong>
//           </td>
//           <td class="totalValue">0</td>
//         </tr>
//         <tr>
//           <td colspan="7" style="text-align: right;">
//             <button class="guardarColores  btn btn-success btn-sm">Guardar</button>
//           </td>
//         </tr> 
//       </tfoot>
//         </table>      
//       `;

//       fila.parentNode?.insertBefore(tablaColor, fila.nextSibling);

//       // const cantidadTotalCell = tablaColor.querySelector(".cantidad-total-cell");
//       // const cantidadTotalCells = tablaColor.querySelectorAll(".cantidad-total-cell");

//       // Enfoca el campo "Color/Talla" de la nueva fila
//       const colorTallaInput = tablaColor.querySelector(".color-talla-cell");
//       if (colorTallaInput instanceof HTMLElement) {
//         colorTallaInput.focus();
//       }

//       // Agrega un manejador de eventos para el campo "XL" de la nueva fila
//       const xlInput = tablaColor.querySelector(".xl-cell");
//       if (xlInput instanceof HTMLElement) {
//         xlInput.addEventListener("keydown", (event) => {
//           if (event.key === "Tab") {
//             event.preventDefault();
//             // Crear una nueva fila debajo
//             const nuevaFila = document.createElement("tr");
//             nuevaFila.innerHTML = `
//               <td contenteditable="true" class="color-talla-cell"></td>
//               <td contenteditable="true" class="s-cell"></td>
//               <td contenteditable="true" class="m-cell"></td>
//               <td contenteditable="true" class="l-cell"></td>
//               <td contenteditable="true" class="xl-cell"></td>
//               <td class="cantidad-total-cell">0</td>
//               <td>
//                 <button class="eliminarFila btn btn-danger btn-sm ">Eliminar</button>
//               </td>
//             `;
//             tablaColor.querySelector("tbody")?.appendChild(nuevaFila);

//             // Enfocar el campo "Color/Talla" de la nueva fila
//             const firstColorTallaInput = nuevaFila.querySelector(".color-talla-cell");
//             if (firstColorTallaInput instanceof HTMLElement) {
//               firstColorTallaInput.focus();
//             }          
//           }
//         });
//       }

//       // Agrega un manejador de eventos para las filas existentes
//       tablaColor.addEventListener("keydown", (event: KeyboardEvent) => {
//         const target = event.target as HTMLElement;
//         if (target.classList.contains("xl-cell") && event.key === "Tab") {
//           event.preventDefault();
//           const parent = target.closest("tr");
//           if (parent) {
//             // Verifica si ya existe una fila debajo
//             const nextRow = parent.nextSibling as HTMLElement;
//             if (!nextRow || !nextRow.querySelector(".xl-cell")) {
//               // Solo crea una nueva fila si no hay una fila "XL" debajo
//               const nuevaFila = document.createElement("tr");
//               nuevaFila.innerHTML = `
//             <td contenteditable="true" class="color-talla-cell"></td>
//             <td contenteditable="true" class="s-cell"></td>
//             <td contenteditable="true" class="m-cell"></td>
//             <td contenteditable="true" class="l-cell"></td>
//             <td contenteditable="true" class="xl-cell"></td>
//             <td class="cantidad-total-cell">0</td>
//             <td>
//               <button class="eliminarFila btn btn-danger btn-sm">Eliminar</button>
//             </td>
//           `;
//               parent.parentNode?.insertBefore(nuevaFila, parent.nextSibling);

//               // Enfoca el campo "Color/Talla" de la nueva fila
//               const firstColorTallaInput = nuevaFila.querySelector(".color-talla-cell");
//               if (firstColorTallaInput instanceof HTMLElement) {
//                 firstColorTallaInput.focus();
//               }          
//             }
//           }
//         }
//       });



//     // Agrega un manejador de eventos para las celdas S, M, L y XL
//     tablaColor.addEventListener("input", (event: Event) => {
//       const target = event.target as HTMLElement;
//       if (target.classList.contains("s-cell") || target.classList.contains("m-cell") || target.classList.contains("l-cell") || target.classList.contains("xl-cell")) {
//         // Obtiene la fila actual
//         const currentRow = target.closest("tr");
//         if (currentRow) {
//           // Actualiza la suma en la celda cantidadTotal de la fila actual
//           updateTotal(currentRow);        
//         }
//         // Valida que solo se ingresen números
//         const value = target.textContent || "";
//         if (!/^\d+$/.test(value)) {
//           target.textContent = "0"; // Establece un valor predeterminado si no es un número
//         }
//       }
//     });


//     function updateTotal(currentRow:HTMLElement) {
//       const sCells = currentRow.querySelectorAll(".s-cell");
//       const mCells = currentRow.querySelectorAll(".m-cell");
//       const lCells = currentRow.querySelectorAll(".l-cell");
//       const xlCells = currentRow.querySelectorAll(".xl-cell");
//       const totalCell = currentRow.querySelector(".cantidad-total-cell");
//       const totalValueCell = tablaColor.querySelector(".totalValue"); // Agrega esta línea

//       let total = 0;
//       sCells.forEach(cell => total += parseInt(cell.textContent || "0"));
//       mCells.forEach(cell => total += parseInt(cell.textContent || "0"));
//       lCells.forEach(cell => total += parseInt(cell.textContent || "0"));
//       xlCells.forEach(cell => total += parseInt(cell.textContent || "0"));

//       totalCell!.textContent = total.toString();
//       totalValueCell!.textContent = updateTotalSum(tablaColor); // Actualiza el campo "Cantidad Total"
//     }


//     function updateTotalSum(tablaColor: HTMLElement) {
//       const totalCells = tablaColor.querySelectorAll(".cantidad-total-cell");
//       let sum = 0;
//       totalCells.forEach(cell => sum += parseInt(cell.textContent || "0"));
//       return sum.toString();
//     }

//       // Agrega un manejador de eventos para el botón "Eliminar" en la tabla de colores
//       tablaColor.addEventListener("click", (event: MouseEvent) => {
//         const target = event.target as HTMLElement;
//         if (target.classList.contains("eliminarFila")) {
//           // Encuentra la fila que contiene el botón "Eliminar"
//           const filaAEliminar = target.closest("tr");
//           if (filaAEliminar) {
//             const totalCell = filaAEliminar.querySelector(".cantidad-total-cell");
//             const cantidadAEliminar = parseInt(totalCell?.textContent || "0");
//             if (!isNaN(cantidadAEliminar)) {
//               const totalValueCell = tablaColor.querySelector(".totalValue");
//               const totalValue = parseInt(totalValueCell?.textContent || "0");
//               if (!isNaN(totalValue)) {
//                 totalValueCell!.textContent = (totalValue - cantidadAEliminar).toString();
//               }
//             }
//             filaAEliminar.remove();
//             updateTotalSum(tablaColor);
//           }
//         }
//       });

//       // Agrega un manejador de eventos para el botón "Guardar"
//       const guardarColoresButton = tablaColor.querySelector(".guardarColores");
//       if (guardarColoresButton instanceof HTMLElement) {
//         guardarColoresButton.addEventListener("click", () => {
//           const totalValueCell = tablaColor.querySelector(".totalValue") as HTMLTableCellElement;
//           const cantidadTotal = totalValueCell.textContent;

//           // Actualiza el campo "Cantidad Total" en la fila actual
//           const cantidadTotalCell = fila.querySelector("td:nth-child(4)");
//           if (cantidadTotalCell instanceof HTMLElement) {
//             cantidadTotalCell.textContent = cantidadTotal;
//             this.actualizarTotal(fila);
//             this.actualizarTotalNeto()
//           }
//         });
//       }

//     }

//     eliminarFila(fila: HTMLElement) {
//       fila.remove();
//       this.actualizarTotalNeto()
//     }
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';

import { v4 as uuidv4 } from 'uuid';

import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/interfaces/pedido/pedido.interface';
import { ReferenciaPedido, ReferenciaPedidoInstance } from 'src/app/interfaces/pedido/referenciaPedido.interface';
import { ProcesoReferenciaPedido,ProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/procesoReferenciaPedido.interface';
import { ColorProcesoReferenciaPedido,ColorProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/colorProcesoReferenciaPedido.interface';
import { TallaColorProcesoReferenciaPedido,TallaColorProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/tallaColorProcesoReferenciaPedido.interface';

import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';

@Component({
  templateUrl: './add.edit.pedido.component.html',
})
export class AddEditPedidoComponent implements OnInit {
  listPedidos: Pedido[] = [];
  pedido: Pedido = {};
  id: number = 0;

  // Corrige la asignación inicial de clienteSeleccionado
  clienteSeleccionado: Cliente | null = null;
  clientes: Cliente[] = [];
  sugerenciasClientes: Cliente[] = []; // Nueva variable para mantener las sugerencias de clientes
  campoBusqueda: string = '';


  tipoMaquina: SelectItem[] = [
    { label: 'Fileteadora', value: 'Fileteadora' },
    { label: 'Plana', value: 'Plana' },
    { label: 'Presilladora', value: 'Presilladora' },
    { label: 'Recubridora', value: 'Recubridora' },
    { label: 'Manual', value: 'Manual' }
  ];

  formaPago: SelectItem[] = [
    { label: 'Credito', value: 'Credito' },
    { label: 'Contado', value: 'Contado' }
  ]

  referencias: Array<ReferenciaPedido | ReferenciaPedidoInstance> = [];
  referencia: string = '';
  descripcion: string = '';
  valorUnitario: number = 0;
  totalNeto: number = 0;


  procesosReferencia: ProcesoReferenciaPedido[] = [];
  tipoDeMaquina: string = 'Fileteadora'
  proceso: string = '';

  mostrarModal: boolean = false;
  procesoSeleccionado: ProcesoReferenciaPedido | null = null;


  referenciaSeleccionada: ReferenciaPedido | null = null;
  procesosReferenciaSeleccionados: ProcesoReferenciaPedido[] | null = null;
  procesoSeleccionadoIndex: number | null = null;

  coloresEnProceso: ColorProcesoReferenciaPedidoInstance[] = []

  expandedRows: { [key: string]: boolean } = {};
  filasAgregadas: any[] = [];


  constructor(
    private _pedidoService: PedidoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.obtenerListaClientes();
  }



  // Función para obtener la lista de clientes
  obtenerListaClientes(): void {
    this._clienteService.getListClientesPedido().subscribe(
      (data: { listClientes: Cliente[] }) => {
        this.clientes = data.listClientes;
        this.sugerenciasClientes = this.clientes.slice(); // Inicializa sugerenciasClientes con la lista completa
        console.log('Clientes:', this.clientes);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Función para buscar clientes según la entrada del usuario
  buscarClientes(event: { query: string }): void {
    this.campoBusqueda = event.query;

    // Filtra la lista completa de clientes para obtener las sugerencias
    this.sugerenciasClientes = this.clientes.filter(cliente =>
      cliente.nombreComercial!.toLowerCase().includes(this.campoBusqueda.toLowerCase()) ||
      cliente.razonSocial!.toLowerCase().includes(this.campoBusqueda.toLowerCase()) ||
      cliente.numeroIdentificacion!.toLowerCase().includes(this.campoBusqueda.toLowerCase())
    );
  }

  agregarReferencia(): void {
    // Validar que los campos requeridos no estén vacíos
    if (!this.referencia || !this.descripcion || !this.valorUnitario || this.procesosReferencia.length === 0) {
      this.toastr.warning('Complete los campos requeridos y agregue al menos un proceso.');
      return;
    }

    // Crear nueva instancia de ReferenciaPedidoInstance y agregarla a la lista de referencias
    const nuevaReferenciaInstance: ReferenciaPedidoInstance = {
      id: uuidv4(),
      referenciaPedido: {
        referencia: this.referencia,
        descripcion: this.descripcion,
        valorUnitario: this.valorUnitario,
      },
      procesoReferenciaPedidos: [...this.procesosReferencia], // Crear copias de los procesos
    };

    this.referencias.push(nuevaReferenciaInstance);

    // Limpiar los campos después de agregar la referencia
    this.referencia = '';
    this.descripcion = '';
    this.valorUnitario = 0;

    // Limpiar la lista de procesos después de agregar la referencia
    this.procesosReferencia = []
  }

  agregarProceso(): void {
    // Validar que los campos de proceso no estén vacíos
    if (!this.proceso || !this.tipoDeMaquina) {
      this.toastr.warning('Complete los campos del proceso.');
      return;
    }

    const nuevoProceso: ProcesoReferenciaPedido = {
      proceso: this.proceso,
      tipoDeMaquina: this.tipoDeMaquina as 'Fileteadora' | 'Plana' | 'Presilladora' | 'Recubridora' | 'Manual'
      // Puedes agregar más propiedades según sea necesario
    };

    this.procesosReferencia.push(nuevoProceso);


    // Limpiar los campos después de agregar el proceso
    this.proceso = '';
    this.tipoDeMaquina = '';
  }



  eliminarProceso(): void {
    if (this.procesoSeleccionadoIndex !== null && this.procesoSeleccionadoIndex !== undefined) {
      this.procesosReferencia.splice(this.procesoSeleccionadoIndex, 1);
      this.toastr.success('Proceso eliminado correctamente.');
    }
  }

  mostrarDetalles(referencia: ReferenciaPedidoInstance): void {
    this.mostrarModal = true;
    this.referenciaSeleccionada = referencia.referenciaPedido;
    this.procesosReferenciaSeleccionados = referencia.procesoReferenciaPedidos

    console.log('Referencias:', this.referencias);
    console.log('Referencia:', this.referenciaSeleccionada);
    console.log('Procesos:', this.procesosReferenciaSeleccionados);
  }





  limpiarDetalles(): void {
    this.procesoSeleccionado = null;
    this.procesoSeleccionadoIndex = null;
  }

  onRowToggle(referencia: ReferenciaPedidoInstance): void {    
    if (!this.expandedRows) {
      this.expandedRows = {};
    }
  
    const id: string | number = referencia.id || ''; 
    this.expandedRows = { ...this.expandedRows, [id]: !this.expandedRows[id] }; 
  }
  

  actualizarCantitadTotal(event: any, talla: string, referencia: any): void {
    const valorIngresado = parseInt(event.target.innerText, 10) || 0;
    referencia[talla] = valorIngresado;
      
    const cantidadTotal = referencia['S'] + referencia['M'] + referencia['L'] + referencia['XL'];
    referencia.cantidadTotal = isNaN(cantidadTotal) ? 0 : cantidadTotal;
  }
  
  calcularCantitadTotal(referencia: any): number {
    return referencia.cantidadTotal || 0;
  }

  agregarNuevaFila(): void {
    // Obtener la última fila editada
    const ultimaFila = this.filasAgregadas[this.filasAgregadas.length - 1];
  
    // Verificar si la última fila no está vacía
    if (ultimaFila && Object.values(ultimaFila).some(valor => !!valor)) {
      // Agregar una nueva fila vacía
      this.filasAgregadas.push({});
    }
  }
  
  
}
