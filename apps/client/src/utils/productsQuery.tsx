// import { ListProductsResponse } from '@repo/schemas';
import { queryOptions } from '@tanstack/react-query';

export const productsQueryOptions = () => {
    const url = 'http://localhost:5001/api/products';

    return queryOptions<any[]>({
        queryKey: ['products'],
        queryFn: () => fetch(url).then((result) => result.json())
    })
}

