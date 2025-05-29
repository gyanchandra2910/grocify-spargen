import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const { category } = useParams();
    const [filteredProducts, setFilteredProducts] = React.useState(products);
    
    useEffect(() => {
        let filtered = products;
        
        // Apply category filter if provided
        if (category) {
            filtered = filtered.filter(product => 
                product.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        // Apply search filter if provided
        if (searchQuery.length > 0) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setFilteredProducts(filtered);
    }, [products, category, searchQuery]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                {category ? `${category} Products` : "All Products"}
            </h1>
            
            {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;