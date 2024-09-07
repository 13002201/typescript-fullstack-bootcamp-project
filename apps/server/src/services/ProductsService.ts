import { prisma } from "../lib/prismaClient";
import { Product } from '../model/product';

export class ProductsService {
    async saveProduct(product:Product): Promise<Product> {
        const result = await prisma.product.create({
            data: product
        });
        return result;
    }

    async getProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        return products;
    }

    async getProduct(id:number): Promise<Product|null> {
        const product = await prisma.product.findUnique(
            {
                where: {
                    id: id
                }
            }
        );
        return product;
    }

    async updateProduct(id: number, product: Product): Promise<Product> {
        const result = await prisma.product.update({
            where: {
                id: id
            },
            data: product
        });
        return result;
    }

    async deleteProduct(id:number): Promise<Product> {
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        });
        return product;
    }
    
}