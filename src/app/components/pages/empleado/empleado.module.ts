import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';

import { TimelineModule } from 'primeng/timeline';

import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        EmpleadoRoutingModule,
        TimelineModule,
        TableModule,
        InputSwitchModule,
        FormsModule
    ],
    declarations: [EmpleadoComponent]
})
export class EmpleadoModule { }