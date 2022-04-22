export interface Producto {
    id:number,
    productoNombre:string,
    descripcion:string,
    cantidadEnStock?:number,
    precio:number,
    imagen?:string,
    categoriaId:number[],
    categorias
}
