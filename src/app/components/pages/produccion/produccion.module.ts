import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { InputTextModule } from 'primeng/inputtext';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
    imports: [
        CommonModule,
        ProduccionRoutingModule,
        TimelineModule,
        AccordionModule,
        TabMenuModule,
        TabViewModule,
        TableModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        TreeTableModule
    ],
    declarations: [ProduccionComponent]
})
export class ProduccionModule { }