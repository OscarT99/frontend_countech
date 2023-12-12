  import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
  import { ActivatedRoute, Router } from '@angular/router';
  import { SelectItem } from 'primeng/api';

  
  import { v4 as uuidv4 } from 'uuid';
  
  import { PedidoService } from 'src/app/services/pedido/pedido.service';
  import { PedidoInstance } from 'src/app/interfaces/pedido/pedido.interface';
  import { ReferenciaPedidoInstance } from 'src/app/interfaces/pedido/referenciaPedido.interface';
  import { ProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/procesoReferenciaPedido.interface';
  import { ColorProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/colorProcesoReferenciaPedido.interface';
  import { TallaColorProcesoReferenciaPedidoInstance } from 'src/app/interfaces/pedido/tallaColorProcesoReferenciaPedido.interface';

  import { ClienteService } from 'src/app/services/cliente/cliente.service';
  import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    templateUrl: './add.pedido.component.html',
  })
  export class AddPedidoComponent implements OnInit {

    tipoMaquina: any[] = [
      { label: 'Fileteadora', value: 'Fileteadora' },
      { label: 'Plana', value: 'Plana' },
      { label: 'Presilladora', value: 'Presilladora' },
      { label: 'Recubridora', value: 'Recubridora' },
      { label: 'Manual', value: 'Manual' }
    ];

    colores: any[] = [
      { label: 'Rojo', value: 'Rojo' },
      { label: 'Azul', value: 'Azul' },
      { label: 'Verde', value: 'Verde' },
      { label: 'Amarillo', value: 'Amarillo' },
      { label: 'Blanco', value: 'Blanco' },
      { label: 'Negro', value: 'Negro' },
      { label: 'Morado', value: 'Morado' },
      { label: 'Naranja', value: 'Naranja' },
      { label: 'Rosa', value: 'Rosa' },
      { label: 'Gris', value: 'Gris' },
      { label: 'Marrón', value: 'Marrón' },
      { label: 'Celeste', value: 'Celeste' },
      { label: 'Turquesa', value: 'Turquesa' },
      { label: 'Violeta', value: 'Violeta' },
      { label: 'Cyan', value: 'Cyan' },
      { label: 'Magenta', value: 'Magenta' },
      { label: 'Dorado', value: 'Dorado' },
      { label: 'Plateado', value: 'Plateado' },
      { label: 'Beige', value: 'Beige' },
      { label: 'Gris oscuro', value: 'Gris oscuro' },
      { label: 'Gris claro', value: 'Gris claro' },
    ];
    
    formaPago: SelectItem[] = [
      { label: 'Crédito', value: 'Crédito' },
      { label: 'Contado', value: 'Contado' }
    ];

    formPedido: FormGroup;

    pedido: PedidoInstance = {};
    id: number = 0;
    
    clientes: Cliente[] = [];
    sugerenciasClientes: Cliente[] = [];
    campoBusqueda: string = '';

    referencias: ReferenciaPedidoInstance[] = [];
    totalNeto: number = 0;


    procesosReferencia: ProcesoReferenciaPedidoInstance[] = [];  
    
    mostrarModal: boolean = false;
    procesoSeleccionado: ProcesoReferenciaPedidoInstance | null = null;


    referenciaSeleccionada: ReferenciaPedidoInstance | null = null;
    procesosReferenciaSeleccionados: ProcesoReferenciaPedidoInstance[] | null = null;
    procesoSeleccionadoIndex: number | null = null;
    @ViewChild('procesoInput') procesoInput: ElementRef | undefined;

    coloresEnProceso: ColorProcesoReferenciaPedidoInstance[] = []

    expandedRows: { [key: string]: boolean } = {};
    
    cantidadS: number = 0;
    cantidadM: number = 0;
    cantidadL: number = 0;
    cantidadXL: number = 0;

    tallasEnColor: TallaColorProcesoReferenciaPedidoInstance[] = [] 

    constructor(private fb: FormBuilder,
      private _pedidoService: PedidoService,
      private toastr: ToastrService,
      private aRouter: ActivatedRoute,
      private _clienteService: ClienteService,
      private router : Router,
    ) { 
      this.formPedido = this.fb.group({        
        cliente:['',Validators.required],
        ordenTrabajo:['',Validators.required],
        fechaOrdenTrabajo:['',Validators.required],
        fechaEntregaOrden:['',Validators.required],
        referencia:['',Validators.required],
        descripcion:['',Validators.required],
        valorUnitario:['',Validators.required],
        proceso:['',Validators.required],
        tipoDeMaquina:['',Validators.required],
        formaPago:[],        
        coloresSeleccionados:['',Validators.required],
        contacto: [{ value: '', disabled: true }],
        totalNeto: [{ value: 0, disabled: true }]
      })
      this.aRouter.params.subscribe(params => {
        this.id = +params['id']; // Obtén el valor del parámetro 'id' de la URL y actualiza id
      });      
    }

    ngOnInit(): void {
      this.aRouter.params.subscribe(params => {
        this.id = +params['id'];

        if (this.id !== 0) {
          this.obtenerListaClientes();
          this.getPedido(this.id)          
        } else {
          this.obtenerListaClientes();
        }
      });


    }

    obtenerListaClientes(): void {
      this._clienteService.getListClientesPedido().subscribe(
        (data: { listClientes: Cliente[] }) => {
          this.sugerenciasClientes = data.listClientes;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }

    buscarClientes(event: any): void {
        this.sugerenciasClientes = this.filterClientes(event.query);
    }
    
    filterClientes(query: string): Cliente[] {
      return this.sugerenciasClientes.filter(
        (cliente) =>
          cliente.razonSocial!.toLowerCase().includes(query.toLowerCase()) ||
          cliente.nombreComercial!.toLowerCase().includes(query.toLowerCase()) ||
          cliente.numeroIdentificacion!.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    seleccionarCliente(event: any): void {
      const clienteId = event.value.id;
      this.formPedido.get('cliente')!.setValue(clienteId);
    
      const clienteSeleccionado = this.sugerenciasClientes.find(c => c.id === clienteId);
    
      if (clienteSeleccionado) {
        this.formPedido.get('contacto')!.setValue(clienteSeleccionado.contacto || '');
      }
    }
        
    agregarReferencia(): void {
      const referencia = this.formPedido.value.referencia;
      const descripcion = this.formPedido.value.descripcion;
      const valorUnitario = this.formPedido.value.valorUnitario;
    
      if (!referencia || !descripcion || !valorUnitario) {
        this.toastr.warning('Complete los campos requeridos.');
        return;
      }
    
      if (this.procesosReferencia.length === 0) {
        this.toastr.warning('Debes agregar al menos un proceso');
        return;
      }
    
      // Obtener colores seleccionados en el momento
      const coloresSeleccionados: string[] = this.formPedido.value.coloresSeleccionados;
    
      // Verificar que se hayan seleccionado colores
      if (!coloresSeleccionados || coloresSeleccionados.length === 0) {
        this.toastr.warning('Debes seleccionar al menos un color');
        return;
      }
    
      // Crear la lista de colores con los colores seleccionados
      const nuevosColores: ColorProcesoReferenciaPedidoInstance[] = coloresSeleccionados.map(color => ({
        color: color,
        tallaColorProcesoReferenciaPedidos: []
      }));
    
      this.coloresEnProceso = nuevosColores

      // Asignar la lista de colores a cada objeto de proceso
      this.procesosReferencia.forEach(proceso => {
        proceso.ColorEnProcesoEnReferenciaEnPedidos = this.coloresEnProceso;
      });
    
      // Crear la nueva referencia con los procesos y colores asignados
      const nuevaReferenciaInstance: ReferenciaPedidoInstance = {
        id: uuidv4(),
        referencia: referencia,
        descripcion: descripcion,
        valorUnitario: valorUnitario,
        ProcesoEnReferenciaEnPedidos: this.procesosReferencia, // Asignar directamente los procesos con los colores asociados
      };
    
      // Agregar la nueva referencia a la lista de referencias
      this.referencias.push(nuevaReferenciaInstance);
    
      // Limpiar los campos del formulario y reiniciar la lista de procesos
      this.formPedido.get('referencia')!.reset();
      this.formPedido.get('descripcion')!.reset();
      this.formPedido.get('valorUnitario')!.reset();
      this.procesosReferencia = [];
    }
    
    agregarProceso(): void {
      const proceso = this.formPedido.value.proceso;
      const tipoDeMaquina = this.formPedido.value.tipoDeMaquina;
    
      if (!proceso || !tipoDeMaquina) { 
        this.toastr.warning('Complete los campos del proceso.');
        return;
      }
    
      const nuevoProceso: ProcesoReferenciaPedidoInstance = {      
        proceso: proceso,
        tipoDeMaquina: tipoDeMaquina ,
        ColorEnProcesoEnReferenciaEnPedidos: [], 
      };
    
      this.procesosReferencia.push(nuevoProceso);
    
      this.formPedido.get('proceso')!.reset();
      this.formPedido.get('tipoDeMaquina')!.reset();

      if (this.procesoInput) {
        this.procesoInput.nativeElement.focus();
      }
    }
    
    mostrarDetalles(referencia: ReferenciaPedidoInstance): void {
      this.mostrarModal = true;
      this.referenciaSeleccionada = referencia;
      this.procesosReferenciaSeleccionados = referencia.ProcesoEnReferenciaEnPedidos  
    }

    onRowToggle(referencia: ReferenciaPedidoInstance): void {    
      if (!this.expandedRows) {
        this.expandedRows = {};
      }
    
      const id: string | number = referencia.id || ''; 
      this.expandedRows = { ...this.expandedRows, [id]: !this.expandedRows[id] };
      
      this.referenciaSeleccionada = referencia;
    }
    
    actualizarCantitadTotal(event: any, talla: string, color: any): void {
      const valorIngresado = parseInt(event.target.innerText, 10) || 0;
  
      // Verificar si el valor ingresado es menor o igual a 0
      if (valorIngresado <= 0) {
          // Restablecer el contenido a 0
          event.target.innerText = '0';
      }
  
      // Actualizar el valor en la propiedad correspondiente
      color[talla] = valorIngresado;
  
      // Recalcular la cantidad total
      const cantidades = ['S', 'M', 'L', 'XL'].map((size) => color[size] || 0);
      color.cantidadTotal = cantidades.reduce((sum, val) => sum + val, 0);
  
      // Actualizar la cantidad total en tiempo real
      color.cantidadTotalEnTiempoReal = color.cantidadTotal;
    }
         
    sumarCantidadTotalReferencia(): number {
      let suma = 0;
    
      this.coloresEnProceso.forEach((color: any) => {
        suma += color.cantidadTotalEnTiempoReal || 0;
      });
    
      let sumaCantidadTotalReferencia = this.referencias.reduce((acc, referencia) => {
        acc += referencia.ProcesoEnReferenciaEnPedidos.reduce((acc, proceso) => {
          acc += proceso.ColorEnProcesoEnReferenciaEnPedidos!.reduce((acc, color) => {
            acc += color.cantidad || 0;
            return acc;
          }, 0);
          return acc;
        }, 0);
        return acc;
      }, 0);
      
      return suma;
    }
    
    eliminarColor(color: any): void {
      if (this.coloresEnProceso.length === 1) {
        this.toastr.warning('Debe haber al menos un color.');
        return;
      }
    
      const index = this.coloresEnProceso.findIndex(c => c === color);
    
      if (index !== -1) {
        this.coloresEnProceso.splice(index, 1);
      }    
    }

    asignarCantidadTotalReferencia(): void {
      if (this.referenciaSeleccionada) {
        // Crear objetos TallaColorProcesoReferenciaPedidoInstance
        this.referenciaSeleccionada.ProcesoEnReferenciaEnPedidos?.forEach(proceso => {
          proceso.ColorEnProcesoEnReferenciaEnPedidos?.forEach(color => {
            const tallasEnColor: TallaColorProcesoReferenciaPedidoInstance[] = [];
    
            (['S', 'M', 'L', 'XL'] as const).forEach((talla) => {
              const cantidad = color[talla as keyof typeof color];
    
              if (typeof cantidad === 'number' && cantidad > 0) {
                const tallaColor: TallaColorProcesoReferenciaPedidoInstance = {
                  talla: talla,
                  cantidad: cantidad as number,
                };
    
                tallasEnColor.push(tallaColor);
              }
            });
    
            // Asignar la lista de tallas al color
            color.TallaEnColorEnProcesoEnReferenciaEnPedidos = tallasEnColor;
    
            // Asignar cantidadTotal al color
            color.cantidad = color.TallaEnColorEnProcesoEnReferenciaEnPedidos?.reduce((total, talla) => total + talla.cantidad, 0) || 0;
          });

          // Asignar cantidadTotal a cada proceso
          proceso.cantidadTotal = proceso.ColorEnProcesoEnReferenciaEnPedidos?.reduce((total, color) => total + (color.cantidad || 0), 0) || 0;
        });
    
        // Asignar cantidadTotal a la referencia
        this.referenciaSeleccionada.cantidadTotal = this.sumarCantidadTotalReferencia();    
      
        this.calcularTotalNeto()
      }
    }

    getPedido(id:number){
      this._pedidoService.getPedido(id).subscribe((data:PedidoInstance) => {        
        console.log(data)
        this.formPedido.patchValue({
          cliente:data.cliente,
          ordenTrabajo:data.ordenTrabajo,          
          fechaOrdenTrabajo: data.fechaOrdenTrabajo,
          fechaEntregaOrden: data.fechaEntregaOrden,
          formaPago:data.formaPago          
        })

        this.referencias = data.ReferenciaEnPedidos || []        
      })
    }
    
    addPedido(){      
      const pedido : PedidoInstance = {
        cliente: this.formPedido.value.cliente,
        ordenTrabajo:this.formPedido.value.ordenTrabajo,
        fechaOrdenTrabajo:this.formPedido.value.fechaOrdenTrabajo,
        fechaEntregaOrden:this.formPedido.value.fechaEntregaOrden,
        formaPago:this.formPedido.value.formaPago,
        valorTotal:this.formPedido.value.valorTotal,
        observaciones:this.formPedido.value.observaciones,
        ReferenciaEnPedidos: this.referencias.map(ref => {
          const { id, ...rest } = ref;
          return rest;
      })
      }

      if(this.id !== 0){
        pedido.id = this.id
        this._pedidoService.putPedido(this.id,pedido).subscribe(()=>{
          this.router.navigate(['/pages/pedido']);
          this.toastr.info(`la orden de trabajo ${pedido.ordenTrabajo} fue actualizada con exito`,`Pedido actualizado`)
        })
      }else{
        this._pedidoService.postPedido(pedido).subscribe(()=>{
          this.router.navigate(['/pages/pedido']);
          this.toastr.success(`La orden de Trabajo ${pedido.ordenTrabajo} fue registrada con exito`,`Cliente agregado`)
        })
      }
    }

    calcularTotalNeto() {
      const formPedido = this.referencias;
    
      if (formPedido) {
        const referencias = formPedido as Array<any>;
        const totalNeto = referencias.reduce((sum: number, referencia: any) => {
          return sum + (referencia.cantidadTotal * referencia.valorUnitario || 0);
        }, 0);
    
        // Formatear el totalNeto antes de asignarlo al formulario
        const totalNetoFormateado = totalNeto.toFixed(2);
    
        this.formPedido.get('totalNeto')!.setValue(totalNetoFormateado);
      }
    }

    eliminarReferencia(referencia: ReferenciaPedidoInstance): void {
      if (this.referencias.length > 1) {
        const index = this.referencias.findIndex(r => r.id === referencia.id);
  
        if (index !== -1) {
          this.referencias.splice(index, 1);  
          this.toastr.success('Referencia eliminada con éxito', 'Eliminación exitosa');
          this.calcularTotalNeto()
        }
      } else {
        this.toastr.warning('Debe haber al menos una referencia.', 'No se puede eliminar');
      }
    }
      
    eliminarProceso(index: number): void {
      if (this.procesosReferencia.length > 1) {
        this.procesosReferencia.splice(index, 1);
      } else {
        this.toastr.warning('Debe haber al menos un proceso.');
      }
    }       
  }
