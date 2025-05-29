import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    useEffect(() => {
        if (category) {
            const filtered = products.filter(product => 
                product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    }, [products, category]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <p className="text-2xl font-bold">{category?.toUpperCase()}</p>
                <p className="text-gray-500">{filteredProducts.length} products found</p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
