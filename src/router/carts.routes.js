import { router } from "express"
import cartManager from '../controllers/cartManager.js';

const cartRouter = router();
const carts = new cartManager

cartRouter.post("/", async (req, res) => {

})

cartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts())
})
cartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})
cartRouter.get("/:id", async (req, res) => {
    res.send(await carts.readCarts())
})
cartRouter.post("/:id", async (req, res) => {
    res.send(await carts.getCartsByID(req.params.id))
})
cartRouter.post("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProdCart(cartId, productId))
})

export default cartRouter