import { router } from "express"
import productManager from '../controllers/productManager.js';

const product = new productManager;

const productRouter = router();

productRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
});

productRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
});

productRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductosByID(id))
});

productRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

productRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body
    res.send(await product.updateProducts(id, updateProduct))
})

export default productRouter