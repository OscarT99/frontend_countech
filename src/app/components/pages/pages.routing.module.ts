import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:[RouterModule.forChild([
        {path:'crud',loadChildren:()=>import('./crud/crud.module').then(m => m.CrudModule)},
        {path:'proveedor',loadChildren:()=>import('./proveedor/proveedor.module').then(m => m.ProveedorModule)},        
        {path:'cliente',loadChildren:()=>import('./cliente/cliente.module').then(m => m.ClienteModule)},   
        {path:'usuario',loadChildren:()=>import('./usuario/usuario.module').then(m => m.UsuarioModule)},      
        {path:'login',loadChildren:()=>import('./auth/login/login.module').then(m => m.LoginModule)},             
        {path:'venta',loadChildren:()=>import('./venta/venta.module').then(m => m.VentaModule)},                     
        {path:'abonoVenta',loadChildren:()=>import('./abonoVenta/abonoVenta.module').then(m => m.AbonoVentaModule)},                     



    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }