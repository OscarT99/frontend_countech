import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:[RouterModule.forChild([
        {path:'crud',loadChildren:()=>import('./crud/crud.module').then(m => m.CrudModule)},
        {path:'proveedor',loadChildren:()=>import('./proveedor/proveedor.module').then(m => m.ProveedorModule)},        
        {path:'cliente',loadChildren:()=>import('./cliente/cliente.module').then(m => m.ClienteModule)},                        
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }