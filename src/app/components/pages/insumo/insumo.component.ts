import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { InsumoService } from 'src/app/services/insumo/insumo.service';  
import { InsumoInstance } from 'src/app/interfaces/insumo/insumo.interface';  
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { CategoriaInsumoInstance } from 'src/app/interfaces/insumo/categoriaInsumo.interface';
import { CategoriaInsumoService } from 'src/app/services/insumo/categoriaInsumo.service';

@Component({
    templateUrl: './insumo.component.html',
    
})
export class InsumoComponent implements OnInit {

    formCategoria:FormGroup;
    formInsumo:FormGroup;

    insumos: InsumoInstance[] = []
    categoriasDeInsumo: CategoriaInsumoInstance[] =[]

    modalCrearInsumo:  boolean = false;
    modalCrearCategoria: boolean = false;
    sugerenciaCategoriasInsumo: CategoriaInsumoInstance[]=[]

    rowsPerPageOptions = [5, 10, 15];


    constructor(private fb:FormBuilder,
      private _insumoService:InsumoService,
      private toastr: ToastrService,      
      private aRouter:ActivatedRoute,
      private _categoriaInsumoService:CategoriaInsumoService
      ){this.formCategoria=this.fb.group({
        nombre:['',Validators.required] 
      }),this.formInsumo=this.fb.group({
        categoria:['',Validators.required],
        nombre:['',Validators.required]
      })}

    ngOnInit():void {                      
        this.getListInsumos();
        this.getListCategoriasDeInsumo();
        this.obtenerListaCategorias();                          
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getListInsumos(){
        this._insumoService.getListInsumos().subscribe((data:any) => {
            this.insumos = data.listInsumos
        })
    }

    showDialogInsumo() {
        this.modalCrearInsumo = true;
    }

    showDialogCategoriaInsumo() {
        this.modalCrearCategoria = true;
    }

    getListCategoriasDeInsumo(){
        this._categoriaInsumoService.getListCategoriasInsumo().subscribe((data:any) =>{
            this.categoriasDeInsumo = data.categoriasInsumo
        })        
    }

    addCategoriaInsumo(){
        const categoria:CategoriaInsumoInstance={
            nombre:this.formCategoria.value.nombre
        }

        this._categoriaInsumoService.postCategoriaInsumo(categoria).subscribe((data:any)=>{
            this.modalCrearCategoria=false;
            this.toastr.success(`La categoria ${categoria.nombre} fue creada con exito`,`Categoria creada`);
            this.getListCategoriasDeInsumo;
        })
    }

    addInsumo(){
        const insumo: InsumoInstance = {
            categoria:this.formInsumo.value.categoria,
            nombre:this.formInsumo.value.nombre
        }

        this.formInsumo.reset({
            ...this.formInsumo.value,
            categoria: '',
            nombre: ''
          });

        this._insumoService.postInsumo(insumo).subscribe((data:any)=>{
            this.modalCrearInsumo=false,
            this.toastr.success(`El insumo ${insumo.nombre} fue registrado con exito`,`Insumo agregado`)
            this.getListInsumos();
        })
    }




    obtenerListaCategorias(): void {
        this._categoriaInsumoService.getListCategorias().subscribe(
          (data: { categoriasInsumo: CategoriaInsumoInstance[] }) => {
            this.sugerenciaCategoriasInsumo = data.categoriasInsumo;
            console.log(this.sugerenciaCategoriasInsumo)
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    
      buscarCategorias(event: any): void {
        this.sugerenciaCategoriasInsumo = this.filterCategorias(event.query);
      }
      
      filterCategorias(query: string): CategoriaInsumoInstance[] {
        return this.sugerenciaCategoriasInsumo.filter(
          (categoria) =>
            categoria.nombre!.toLowerCase().includes(query.toLowerCase()) 
        );
      }
    
      seleccionarCategoria(event: any): void {
        const categoriaId = event.value.id;
        this.formInsumo.get('categoria')!.setValue(categoriaId);
      }
}
