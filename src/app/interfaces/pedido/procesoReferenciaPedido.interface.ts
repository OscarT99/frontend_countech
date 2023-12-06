import { ColorProcesoReferenciaPedidoInstance } from "./colorProcesoReferenciaPedido.interface";

  
  export interface ProcesoReferenciaPedidoInstance {
    id?: number;
    referencia?: number;
    proceso: string;
    tipoDeMaquina: 'Fileteadora' | 'Plana' | 'Presilladora' | 'Recubridora' | 'Manual';
    cantidadTotal?: number;
    ColorEnProcesoEnReferenciaEnPedidos: ColorProcesoReferenciaPedidoInstance[];
  }
  