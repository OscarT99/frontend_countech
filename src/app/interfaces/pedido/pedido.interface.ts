  import { ReferenciaPedidoInstance } from "./referenciaPedido.interface";

  export interface PedidoInstance {
      id?: number;
      cliente?: number;
      ordenTrabajo?: string;
      fechaOrdenTrabajo?: Date;
      fechaEntregaOrden?: Date;
      formaPago?: 'Contado' | 'Crédito';
      valorTotal?: number;
      ReferenciaEnPedidos? : ReferenciaPedidoInstance[];
      observaciones?: string;
      estadoPedido?:boolean,
      motivoDeAnulacion?:string
    }
    
    