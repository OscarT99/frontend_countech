import { DetalleCompraInstance } from "./detalleCompra.interface";

export interface CompraInstance {
    id?: number;
    proveedor?:number;
    fechaCompra?:Date;
    numeroFactura?: string;
    formaPago?:'Contado' | 'Crédito';
    detalleEnCompras?: DetalleCompraInstance[];
    totalBruto?:number,
    iva?:number,
    totalNeto?:number
}