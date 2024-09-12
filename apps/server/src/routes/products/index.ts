import express, { Express } from 'express';
import { ProductsService } from '../../services/ProductsService';

export function productsRoute(app: Express): void{
    const router = express.Router();
    const service = new ProductsService();
    
    app.use('/api/products', router);

    router.post('/', async function (req, res, next) {
        try {
            const product = req.body;
            const result = await service.saveProduct(product);
            res.json({
                result
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/', async function(req, res, next){
        try {
            const result = await service.getProducts();
            return res.json({
                result
            })
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async function(req, res, next){
        try {
            const id = Number(req.params.id);
            const result = await service.getProduct(id);
            return res.json({
                result
            })
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', async function(req, res, next) {
        try {
            const id = Number(req.params.id);
            const product = req.body;
            const result = await service.updateProduct(id, product);
            return res.json({
                result
            })
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', async function (req, res, next) {
        try {
            const id = Number(req.params.id);
            const result =  await service.deleteProduct(id);
            return res.json({
                result
            })
        } catch (error) {
            next(error);
        }
    });

}