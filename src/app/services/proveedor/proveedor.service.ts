import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Proveedor } from 'src/app/interfaces/proveedor/proveedor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/proveedor/'
   }

   getProveedor(id:number):Observable<Proveedor>{
    return this.http.get<Proveedor>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   getListProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${this.myAppUrl}${this.myApiUrl}`)
   }

   postProveedor(proveedor: Proveedor):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,proveedor)
   }

   putProveedor(id:number,proveedor:Proveedor):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,proveedor)
   }

   deleteProveedor(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }


   getCountries() {
    return this.http.get<any>('assets/demo/data/countries.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
  }
}
