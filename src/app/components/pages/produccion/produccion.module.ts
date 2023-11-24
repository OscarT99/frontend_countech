import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';

import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';

import { TimelineModule } from 'primeng/timeline';
@NgModule({
    imports: [
        CommonModule,
        ProduccionRoutingModule,
        TimelineModule,
        AccordionModule,
        TabMenuModule
    ],
    declarations: [ProduccionComponent]
})
export class ProduccionModule { }