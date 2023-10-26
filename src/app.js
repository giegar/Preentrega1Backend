import express from 'express';
import productRouter from './router/product.routes.js';
import cartRouter from './router/carts.routes.js';

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto ${puerto}`)
});