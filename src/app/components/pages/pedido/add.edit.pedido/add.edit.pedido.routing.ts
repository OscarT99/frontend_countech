import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditPedidoComponent } from './add.edit.pedido.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AddEditPedidoComponent }		 
	])],
	exports: [RouterModule]
})
export class AddEditPedidoRoutingModule { }
