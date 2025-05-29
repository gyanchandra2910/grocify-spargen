import React from "react";
import { useAppContext } from "../context/AppContext";

const AllProducts = () => {
    const {products} = useAppContext();
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default AllProducts;