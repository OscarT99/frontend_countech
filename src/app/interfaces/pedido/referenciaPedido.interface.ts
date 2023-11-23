import { ProcesoReferenciaPedido } from "./procesoReferenciaPedido.interface";

export interface ReferenciaPedido {
    pedido?: number;
    referencia: string;
    descripcion: string;
    valorUnitario: number;
    cantidadTotal?: number;
  }
  
  export interface ReferenciaPedidoInstance {
    id?: string;
    referenciaPedido: ReferenciaPedido;
    procesoReferenciaPedidos: ProcesoReferenciaPedido[];
  }
  