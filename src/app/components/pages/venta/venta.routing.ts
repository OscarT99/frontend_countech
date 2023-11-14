import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentaComponent } from './venta.component'; 

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VentaComponent }		 
	])],
	exports: [RouterModule]
})
export class VentaRoutingModule { }
