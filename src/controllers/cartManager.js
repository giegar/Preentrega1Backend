import { promises as fs } from 'fs';
import { nanoid } from "nanoid";
import productManager from './productManager.js';

const productsAll = new productManager

class cartManager {
    constructor() {
        this.path = './src/models/carts.json';
    }
    
    readCarts = async () => {
        try{
            let carts = await fs.readFile(this.path, "utf-8");
            return JSON.parse(carts);
        }catch(error){
            console.error("Error readProductos")}  
    };

    writeCart = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid(5);
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCart(cartsConcat)
        return "Carrito agregado"
    }

    cartExistente = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }

    getCartsByID = async (id) => {
        try{
            let cartsById = await this.idExistente(id);
            if(!cartsById) return "Carrito no encontrado"
            return cartsById;
        }catch(error){
            console.error("Error getCartsById")}
    };

    addProdCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"
        let productById = await productsAll.exist(productId)
        if(!cartById) return "Producto no encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if(cartById.products.some(prod = prod.id === productId)){
            let productInCart = cartById.products.find(prod => prod.id === productId)
            productInCart.cantidad++
            let cartsConcat = [productInCart, ...cartFilter]
            await this.writeCart(cartsConcat)
            return "Sumado al carrito"
        }
        
        cartById.products.push({ id: productById, cantidad: 1})
        let cartsConcat = [productInCart, ...cartFilter]
        await this.writeCart(cartsConcat)
        return "Producto agregado al carrito"
    }
}

export default cartManager

