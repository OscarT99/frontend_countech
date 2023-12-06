import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { InsumoInstance } from 'src/app/interfaces/insumo/insumo.interface'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/insumo/'
   }

   getInsumo(id:number):Observable<InsumoInstance>{
    return this.http.get<InsumoInstance>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   getListInsumos():Observable<InsumoInstance[]>{
    return this.http.get<InsumoInstance[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }

   getListInsumosCompra(): Observable<{ listInsumos: InsumoInstance[] }> {
    return this.http.get<{ listInsumos: InsumoInstance[] }>(`${this.myAppUrl}${this.myApiUrl}`);
  }

   postInsumo(insumo: InsumoInstance):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,insumo)
   }

   putInsumo(id:number,insumo:InsumoInstance):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,insumo)
   }

   deleteInsumo(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }
   
    buscarInsumos(termino: string): Observable<InsumoInstance[]> {
        const url = `${this.myAppUrl}${this.myApiUrl}buscar?termino=${termino}`;
        return this.http.get<InsumoInstance[]>(url);
    }
}
