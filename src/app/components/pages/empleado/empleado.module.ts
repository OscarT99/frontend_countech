import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';

import { TimelineModule } from 'primeng/timeline';
@NgModule({
    imports: [
        CommonModule,
        EmpleadoRoutingModule,
        TimelineModule
    ],
    declarations: [EmpleadoComponent]
})
export class EmpleadoModule { }