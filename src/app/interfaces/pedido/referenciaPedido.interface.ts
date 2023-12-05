import {ProcesoReferenciaPedidoInstance } from "./procesoReferenciaPedido.interface";

  export interface ReferenciaPedidoInstance {
    id?: string;
    pedido?: number;
    referencia: string;
    descripcion: string;
    valorUnitario: number;
    cantidadTotal?: number;
    ProcesoEnReferenciaEnPedidos: ProcesoReferenciaPedidoInstance[];
  }
  