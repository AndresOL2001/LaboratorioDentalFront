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

export interface ProductoCreacion {

    ProductoNombre:string,
    Descripcion:string,
    CantidadEnStock?:number,
    precio:number,
    imagen?:File,
    categoriaProductosIds:number[],

}