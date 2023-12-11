import { ColorProcesoReferenciaPedidoInstance } from "./colorProcesoReferenciaPedido.interface";
import { AsignarProceso } from "../produccion/asignarProceso.interface";
  
export interface ProcesoReferenciaPedidoInstance {
  id?: number;
  referencia?: number;
  proceso: string;
  tipoDeMaquina: 'Fileteadora' | 'Plana' | 'Presilladora' | 'Recubridora' | 'Manual';
  cantidadTotal?: number;
  cantidadAsignada?: number;
  cantidadHecha?: number;
  cantidadPendiente?: number;
  estado?: boolean;
  ColorEnProcesoEnReferenciaEnPedidos: ColorProcesoReferenciaPedidoInstance[];
  AsignarProcesos?: AsignarProceso[];
}

export interface ProcesoReferenciaPedido {
  id?: number;  
  cantidadTotal?: number;
  cantidadAsignada?: number;
  cantidadHecha?: number;
  cantidadPendiente?: number;
  estado?: boolean;
}
  