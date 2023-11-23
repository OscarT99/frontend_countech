import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Pedido } from 'src/app/interfaces/pedido/pedido.interface'; 
import { Observable } from 'rxjs';

@Injectable()
  export class PedidoService {
    private myAppUrl: string;  
    private myApiUrl: string; 
  
    constructor(private http: HttpClient) { 
      this.myAppUrl = environment.endpoint
      this.myApiUrl = 'api/pedidos/'
    }
  
    getPedido(id:number): Observable<Pedido>{
      return this.http.get<Pedido>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    
    getListPedidos(): Observable<Pedido[]>{
      return this.http.get<Pedido[]>(`${this.myAppUrl}${this.myApiUrl}`)    
    }
  
    postPedido(pedido : Pedido):Observable<void>{
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,pedido)
    }
  
    putPedido(id:number,pedido:Pedido):Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,pedido)
    }
      
  }
  