import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';
import { TableModule } from 'primeng/table';


import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
@NgModule({
    imports: [
        CommonModule,
        ProduccionRoutingModule,
        TimelineModule,
        AccordionModule,
        TabMenuModule,
        TabViewModule,
        TableModule
    ],
    declarations: [ProduccionComponent]
})
export class ProduccionModule { }