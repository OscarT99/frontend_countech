import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { PedidoInstance } from 'src/app/interfaces/pedido/pedido.interface'; 
import { Observable } from 'rxjs';

@Injectable()
  export class PedidoService {
    private myAppUrl: string;  
    private myApiUrl: string; 
    private myApiUrlEstado: string;
  
    constructor(private http: HttpClient) { 
      this.myAppUrl = environment.endpoint
      this.myApiUrl = 'api/pedidos/'
      this.myApiUrlEstado = '/estado/'
    }
  
    getPedido(id:number): Observable<PedidoInstance>{
      return this.http.get<PedidoInstance>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    
    getListPedidos(): Observable<PedidoInstance[]>{
      return this.http.get<PedidoInstance[]>(`${this.myAppUrl}${this.myApiUrl}`)    
    }
  
    postPedido(pedido : PedidoInstance):Observable<void>{
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,pedido)
    }
  
    putPedido(id:number,pedido:PedidoInstance):Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,pedido)
    }

    putPedidoEstado(id:number, pedido:PedidoInstance):Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}${this.myApiUrlEstado}`,pedido)
    }

    deletePedido(id:number): Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
      
  }
  