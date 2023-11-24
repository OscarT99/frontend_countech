import { ColorProcesoReferenciaPedido } from "./colorProcesoReferenciaPedido.interface";

export interface ProcesoReferenciaPedido {
    referencia?: number;
    proceso: string;
    tipoDeMaquina: 'Fileteadora' | 'Plana' | 'Presilladora' | 'Recubridora' | 'Manual';
    cantidadTotal?: number;
  }
  
  export interface ProcesoReferenciaPedidoInstance {
    id?: number;
    procesoReferenciaPedido: ProcesoReferenciaPedido;
    colorProcesoReferenciaPedidos?: ColorProcesoReferenciaPedido[];
  }
  