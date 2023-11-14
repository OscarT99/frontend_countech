import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/services/cliente/cliente.service'; 
import { Cliente } from 'src/app/interfaces/cliente/cliente.interface';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
    templateUrl: './cliente.component.html',
    
})
export class ClienteComponent implements OnInit {
    listClientes: Cliente[] = []
    cliente: Cliente = {}
    formCliente:FormGroup;
    id:number=0;

    valSwitch: boolean = false;
    showConfirmationDialog: boolean = false;
    clienteSeleccionado: Cliente | null = null;
    switchState: boolean | undefined = undefined;

    tipoCliente: SelectItem[] = [
      { label: 'Empresa', value: 'Empresa' },
      { label: 'Persona', value: 'Persona' }
    ];
    selectedCliente: string = ''; 

    tipoIdentificacion:SelectItem[] = [
      { label: 'NIT',value:'NIT' },
      { label: 'Cedula de Ciudadania', value:'Cedula de ciudadania' },
      { label: 'Registro civil', value:'Registro civil' },
      { label: 'Tarjeta de extranjero', value:'Tarjeta de extranjero' },
      { label: 'Cedula de extranjero', value:'Cedula de extranjero' },
      { label: 'Pasaporte', value:'Pasaporte' },
      { label: 'Tarjeta de identidad', value:'Tarjeta de identidad' },
    ];
    selectedIdentificacion: SelectItem = { value: '' };

    estado:SelectItem[] = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false }
    ];
    selectedEstado: SelectItem = {value: ''};

    countries: any[] = [];
    filteredCountries: any[] = [];
    selectedCountryAdvanced: any[] = [];

    productDialog: boolean = false;
    

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    rowsPerPageOptions = [5, 10, 15];


    constructor(private fb:FormBuilder,
      private _clienteService:ClienteService,
      private toastr: ToastrService,      
      private aRouter:ActivatedRoute,
      ){
        this.formCliente = this.fb.group({
          tipoCliente: ['',Validators.required],
          tipoIdentificacion: ['',Validators.required],
          numeroIdentificacion: ['',Validators.required],
          razonSocial: ['',Validators.required],
          nombreComercial: ['',Validators.required],
          ciudad: ['',Validators.required],
          direccion: ['',],
          contacto: ['',],
          telefono: ['',],
          correo: ['',],
          estado: ['',],
        })
        this.aRouter.params.subscribe(params => {
          this.id = +params['id']; // Obtén el valor del parámetro 'id' de la URL y actualiza id
        });
       }

    ngOnInit():void {        
        this.getListClientes()

        this._clienteService.getCountries().then(countries => {
            this.countries = countries;
        });                        
    }

    

    getListClientes(){     
        this._clienteService.getListClientes().subscribe((data:any) =>{      
          this.listClientes = data.listClientes;          
        })        
    }

    getCliente(id:number){      
      this._clienteService.getCliente(id).subscribe((data:Cliente) => {
        console.log(data)
        this.formCliente.setValue({
          tipoCliente: data.tipoCliente,
          tipoIdentificacion: data.tipoIdentificacion,
          numeroIdentificacion: data.numeroIdentificacion,
          razonSocial: data.razonSocial,
          nombreComercial : data.nombreComercial,
          ciudad: data.ciudad,
          direccion:data.direccion,
          contacto:data.contacto,
          telefono:data.telefono,
          correo: data.correo,
          estado: data.estado
        })
      })
    }


    addCliente(){
      const cliente : Cliente = {
       tipoCliente: this.formCliente.value.tipoCliente,
       tipoIdentificacion: this.formCliente.value.tipoIdentificacion,
       numeroIdentificacion: this.formCliente.value.numeroIdentificacion,
       razonSocial: this.formCliente.value.razonSocial,
       nombreComercial: this.formCliente.value.nombreComercial,
       ciudad: this.formCliente.value.ciudad,
       direccion: this.formCliente.value.direccion,
       contacto: this.formCliente.value.contacto,
       telefono: this.formCliente.value.telefono,
       correo: this.formCliente.value.correo,
       estado: this.formCliente.value.estado,
      }
 
      if(this.id !== 0){
       cliente.id = this.id
       this._clienteService.putCliente(this.id,cliente).subscribe(()=>{         
        this.productDialog = false;
        this.toastr.info(`El cliente ${cliente.razonSocial} fue actualizado con exito`,`Cliente actualizado`)
        this.getListClientes();         
       })
      }else{            
       this._clienteService.postCliente(cliente).subscribe(() => {        
        this.productDialog = false;
        this.toastr.success(`El cliente ${cliente.razonSocial} fue registrado con exito`,`Cliente agregado`)        
        this.getListClientes();
       })
      }
 
      this.productDialog = false;
     
   }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event!.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }

    openNew() {
        this.id = 0;                
        this.formCliente.reset()
        this.productDialog = true;
        this.selectedCountryAdvanced = [];
    }
    
    editProduct(id:number) {
        this.id=id;
        this.productDialog = true;
        this.getCliente(id)
    }

    hideDialog() {
        this.productDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showConfirmation(cliente:Cliente) {
      this.switchState = cliente.estado;
      this.clienteSeleccionado = cliente;
      this.showConfirmationDialog = true;      
    }
    
    confirmAction(confirmation: boolean) {
      if (confirmation && this.clienteSeleccionado) {      
        if (this.clienteSeleccionado.id) {
          this._clienteService.putCliente(this.clienteSeleccionado.id, this.clienteSeleccionado).subscribe(() => {
            if (this.clienteSeleccionado!.estado !== undefined) {
              this.valSwitch = this.clienteSeleccionado!.estado;
            }
          });
        }
      }
      this.showConfirmationDialog = false;
      this.clienteSeleccionado = null;
    }
    
    exportToExcel() {
      const data: any[] = []; // Array para almacenar los datos
    
      // Agregar encabezados a la matriz de datos
      const headers = [
        'Tipo',
        'N° Identificación',
        'Razon Social',
        'Telefono',
        'Email',
        'Estado'
      ];
    
      data.push(headers);
    
      // Agregar datos de cada fila a la matriz de datos
      this.listClientes.forEach(cliente => {
        const row = [
          cliente.tipoCliente,
          cliente.numeroIdentificacion,
          cliente.razonSocial,
          cliente.telefono,
          cliente.correo,
          cliente.estado ? 'Activo' : 'Inactivo'
        ];
    
        data.push(row);
      });
    
      // Crear un libro de Excel
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    
      // Guardar el libro de Excel como archivo
      XLSX.writeFile(wb, 'clientes.xlsx');
    }
    
            
}
