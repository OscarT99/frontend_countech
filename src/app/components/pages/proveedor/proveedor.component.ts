import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';  
import { Proveedor } from 'src/app/interfaces/proveedor/proveedor.interface'; 
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
    templateUrl: './proveedor.component.html',
    
})
export class ProveedorComponent implements OnInit {
    listProveedores: Proveedor[] = []
    proveedor: Proveedor = {}
    formProveedor:FormGroup;
    id:number=0;

    valSwitch: boolean = false;
    showConfirmationDialog: boolean = false;
    proveedorSeleccionado: Proveedor | null = null;
    switchState: boolean | undefined = undefined;

    tipoProveedor: SelectItem[] = [
      { label: 'Empresa', value: 'Empresa' },
      { label: 'Persona', value: 'Persona' }
    ];
    selectedProveedor: string = ''; 

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
      private _proveedorService:ProveedorService,
      private toastr: ToastrService,      
      private aRouter:ActivatedRoute,
      ){
        this.formProveedor = this.fb.group({
          tipoProveedor: ['',Validators.required],
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
        this.getListProveedores()

        this._proveedorService.getCountries().then(countries => {
            this.countries = countries;
        });                        
    }

    

    getListProveedores(){     
        this._proveedorService.getListProveedores().subscribe((data:any) =>{      
          this.listProveedores = data.listProveedores;          
        })        
    }

    getProveedor(id:number){      
      this._proveedorService.getProveedor(id).subscribe((data:Proveedor) => {
        console.log(data)
        this.formProveedor.setValue({
          tipoProveedor: data.tipoProveedor,
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


    addProveedor(){
      const proveedor : Proveedor = {
       tipoProveedor: this.formProveedor.value.tipoProveedor,
       tipoIdentificacion: this.formProveedor.value.tipoIdentificacion,
       numeroIdentificacion: this.formProveedor.value.numeroIdentificacion,
       razonSocial: this.formProveedor.value.razonSocial,
       nombreComercial: this.formProveedor.value.nombreComercial,
       ciudad: this.formProveedor.value.ciudad,
       direccion: this.formProveedor.value.direccion,
       contacto: this.formProveedor.value.contacto,
       telefono: this.formProveedor.value.telefono,
       correo: this.formProveedor.value.correo,
       estado: this.formProveedor.value.estado,
      }
 
      if(this.id !== 0){
        proveedor.id = this.id
       this._proveedorService.putProveedor(this.id,proveedor).subscribe(()=>{         
        this.productDialog = false;
        this.toastr.info(`El proveedor ${proveedor.razonSocial} fue actualizado con exito`,`Cliente actualizado`)
        this.getListProveedores();         
       })
      }else{            
       this._proveedorService.postProveedor(proveedor).subscribe(() => {        
        this.productDialog = false;
        this.toastr.success(`El proveedor ${proveedor.razonSocial} fue registrado con exito`,`Cliente agregado`)        
        this.getListProveedores();
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
        this.formProveedor.reset()
        this.productDialog = true;
        this.selectedCountryAdvanced = [];
    }
    
    editProduct(id:number) {
        this.id=id;
        this.productDialog = true;
        this.getProveedor(id)
    }

    hideDialog() {
        this.productDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showConfirmation(proveedor:Proveedor) {
      this.switchState = proveedor.estado;
      this.proveedorSeleccionado = proveedor;
      this.showConfirmationDialog = true;      
    }
    
    confirmAction(confirmation: boolean) {
      if (confirmation && this.proveedorSeleccionado) {      
        if (this.proveedorSeleccionado.id) {
          this._proveedorService.putProveedor(this.proveedorSeleccionado.id, this.proveedorSeleccionado).subscribe(() => {
            if (this.proveedorSeleccionado!.estado !== undefined) {
              this.valSwitch = this.proveedorSeleccionado!.estado;
            }
          });
        }
      }
      this.showConfirmationDialog = false;
      this.proveedorSeleccionado = null;
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
      this.listProveedores.forEach(proveedor => {
        const row = [
            proveedor.tipoProveedor,
            proveedor.numeroIdentificacion,
            proveedor.razonSocial,
            proveedor.telefono,
            proveedor.correo,
            proveedor.estado ? 'Activo' : 'Inactivo'
        ];
    
        data.push(row);
      });
    
      // Crear un libro de Excel
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Proveedores');
    
      // Guardar el libro de Excel como archivo
      XLSX.writeFile(wb, 'Proveedores.xlsx');
    }
    
            
}
