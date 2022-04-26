import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/products');
      const data = await res.json();
      setProducts(data.products);
      console.log('Products received');
    };

    fetchProducts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Products;
