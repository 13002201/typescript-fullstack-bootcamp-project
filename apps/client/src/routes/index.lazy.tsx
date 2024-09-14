import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '../styles/products.css';

export const Route = createLazyFileRoute('/')({
  component: SearchPage,
})

function SearchPage() {

    const { status, data, error } = useQuery({ queryKey: ['todos'], queryFn: () => fetch('http://localhost:5001/api/products/').then((result) => result.json()) })
    const products = data?.result;

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('relevance')

    const handleSearch = (e:any) => {
        setSearchTerm(e.target.value);
    };

    const handelSort = (e:any) => {
        setSortOption(e.target.value);
    }

    const filteredProducts: any[] = products
        ?.filter((product:any) => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.sort((a:any,b:any) => {
            switch (sortOption) {
                case 'priceLowToHigh':
                    return parseFloat(a?.price?.substring(1)) - parseFloat(b?.price?.substring(1))
                case 'priceHighToLow':
                    return parseFloat(b?.price?.substring(1)) - parseFloat(a?.price?.substring(1));
                default:
                    return 0;
            }
        });

  return (
        <div>
            <div className='search-container'>
                <input
                    type="text"
                    placeholder='Search for products...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={sortOption} onChange={handelSort}>
                    <option value="relevance"></option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                </select>
            </div>

            <div className='container'>
                {filteredProducts?.map((product:any) => (
                    <div key={product.id} className='card'>
                        <div className="card-content">
                            <h3>{product?.name}</h3>
                            <p>{product?.description}</p>
                            <p className='price'>{product?.price}</p>
                            <img src={product.image} alt="Product Image"></img>                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}