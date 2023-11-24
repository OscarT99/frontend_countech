export interface TallaColorProcesoReferenciaPedido {
    color: number;
    talla: 'S' | 'M' | 'L' | 'XL';
    cantidad: number;
    cantAsignada?: number;
    cantHecha?: number;
  }
  
  export interface TallaColorProcesoReferenciaPedidoInstance {
    id?: number;
    tallaColorProcesoReferenciaPedido: TallaColorProcesoReferenciaPedido;
  }
  