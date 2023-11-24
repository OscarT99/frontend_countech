import { TallaColorProcesoReferenciaPedido } from "./tallaColorProcesoReferenciaPedido.interface";

export interface ColorProcesoReferenciaPedido {
    proceso: number;
    color: string;
    cantidad: number;
  }
  
  export interface ColorProcesoReferenciaPedidoInstance {
    id?: number;
    colorProcesoReferenciaPedido: ColorProcesoReferenciaPedido;
    tallaColorProcesoReferenciaPedidos?: TallaColorProcesoReferenciaPedido[];
  }
  