import { promises as fs } from 'fs';
import { nanoid } from "nanoid";

class productManager {
    constructor() {
        this.path = './src/models/productos.json';

    }

    readProductos = async () => {
        try{
            let productos = await fs.readFile(this.path, "utf-8");
            return JSON.parse(productos);
        }catch(error){
            console.error("Error readProductos")}  
    };

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(productsAll));
    }

    addProducts = async (product) =>{
        let productsOld = await this.readProductos();
        product.id = nanoid(3);
        let productsAll = [...productsOld, product];
        await this.writeProducts(productsAll);
        return "Producto agregado";
    }

    getProductos = async () => {
        try{
            return await this.readProductos();  
        }catch(error){
            console.error("Error getProductos")}
    };

    getProductosByID = async (id) => {
        try{
            let productById = await this.idExistente(id);
            if(!productById) return "Producto no encontrado"
            return productById;
        }catch(error){
            console.error("Error getProductos")}
    };

    idExistente = async (id) => {
        let products = await this.readProductos();
        return products.find(prod => prod.id === id)
    }

    updateProducts = async (id, product) => {
        try{
            let productById = await this.idExistente();
            if(!productById) return "Producto no encontrado"
            await this.deleteProducts(id)
            let productsOld = await this.readProductos();
            let products = [{...product, id : id}, ...productsOld]
            await this.writeProducts(products)
            return "Producto actualizado"
        }catch{

        }
    }

    deleteProducts = async (id) => {
        try{
            let products = await this.readProductos();
            let existeProd = products.some(prod => prod.id === id)
            if (existeProd) {
                let filterProd = products.filter(prod => prod.id != id)
                await this.writeProducts(filterProd)
                return "Producto eliminado"
            } else {
                return "El producto no existe"
            }
        }catch(error){
            console.error("Error deleteProducts")
        }
    }
}

export default productManager;

