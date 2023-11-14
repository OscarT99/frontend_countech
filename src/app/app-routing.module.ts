import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/app.layout.component';
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
    path: '', component: AppLayoutComponent,
    children:[
      {path:'pages',loadChildren:()=>import('./components/pages/pages.modules').then(m => m.PagesModule)}
    ]
    
  }
])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
