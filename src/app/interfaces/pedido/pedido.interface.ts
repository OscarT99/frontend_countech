import { Cliente } from "../cliente/cliente.interface";
import { ReferenciaPedido } from "./referenciaPedido.interface";

export interface Pedido {
    cliente?: number;
    ordenTrabajo?: string;
    fechaOrdenTrabajo?: Date;
    fechaRegistro?: Date;
    fechaEntregaOrden?: Date;
    formaPago?: 'Contado' | 'Crédito';
    valorTotal?: number;
    observaciones?: string;
    estado?: 'Registrado' | 'En proceso' | 'Terminado';
    estadoPago?: 'Pago' | 'Pendiente';
    fechaVenta?: Date | null;
  }
  
  export interface PedidoInstance {
    id?: number;
    pedido: Pedido;
    cliente?: Cliente;
    referenciaPedidos?: ReferenciaPedido[];
  }