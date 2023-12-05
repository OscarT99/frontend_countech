import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:[RouterModule.forChild([
        {path:'crud',loadChildren:()=>import('./crud/crud.module').then(m => m.CrudModule)},
        {path:'proveedor',loadChildren:()=>import('./proveedor/proveedor.module').then(m => m.ProveedorModule)},        
        {path:'cliente',loadChildren:()=>import('./cliente/cliente.module').then(m => m.ClienteModule)},   
        {path:'usuario',loadChildren:()=>import('./usuario/usuario.module').then(m => m.UsuarioModule)},      
        {path:'venta',loadChildren:()=>import('./venta/venta.module').then(m => m.VentaModule)},                     
        {path:'abonoVenta',loadChildren:()=>import('./abonoVenta/abonoVenta.module').then(m => m.AbonoVentaModule)},                     
        {path:'pedido',loadChildren:()=>import('./pedido/list.pedido/list.pedido.module').then(m => m.ListPedidoModule)},
        {path:'pedido/add',loadChildren:()=>import('./pedido/add.pedido/add.pedido.module').then(m => m.AddPedidoModule)},
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }