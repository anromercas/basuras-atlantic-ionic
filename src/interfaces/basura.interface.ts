export interface Basura {
    nombre: string;
    calificacion: number;
    observaciones: string;
    zona: string;
    fecha: string;
    img:string;
    llenado: number;
    numeroContenedor?: number;
    codigoContenedor?: string;
    imgContenedor?: string;
    imgDetalle?:string;
    estado?:string;
    id?: string;
    key?: string;
}