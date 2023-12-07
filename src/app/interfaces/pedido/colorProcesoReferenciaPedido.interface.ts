import { TallaColorProcesoReferenciaPedidoInstance } from "./tallaColorProcesoReferenciaPedido.interface";

  export interface ColorProcesoReferenciaPedidoInstance {
    id?: number;
    proceso?: number;
    color: string;
    cantidad?: number;
    TallaEnColorEnProcesoEnReferenciaEnPedidos?: TallaColorProcesoReferenciaPedidoInstance[];
  }
  