import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { CategoriaInsumoInstance } from 'src/app/interfaces/insumo/categoriaInsumo.interface';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaInsumoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/categoriaInsumo/'
   }

   getCategoriaInsumo(id:number):Observable<CategoriaInsumoInstance>{
    return this.http.get<CategoriaInsumoInstance>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   getListCategoriasInsumo():Observable<CategoriaInsumoInstance[]>{
    return this.http.get<CategoriaInsumoInstance[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }

   getListCategorias(): Observable<{ categoriasInsumo: CategoriaInsumoInstance[] }> {
    return this.http.get<{ categoriasInsumo: CategoriaInsumoInstance[] }>(`${this.myAppUrl}${this.myApiUrl}`);
  }

   postCategoriaInsumo(categoriaInsumo: CategoriaInsumoInstance):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,categoriaInsumo)
   }

   putCategoriaInsumo(id:number,categoriaInsumo:CategoriaInsumoInstance):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,categoriaInsumo)
   }

   deleteCategoriaInsumo(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }
   
    buscarCategoriaInsumos(termino: string): Observable<CategoriaInsumoInstance[]> {
        const url = `${this.myAppUrl}${this.myApiUrl}buscar?termino=${termino}`;
        return this.http.get<CategoriaInsumoInstance[]>(url);
    }
}
