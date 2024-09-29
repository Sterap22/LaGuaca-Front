import ProductCard from "./ProductCard";


const CategoryCarousel = ({ category = 'otros', products = [], selectedProducts = [], onAddProduct = {}, onRemoveProduct = {} }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-100 rounded-lg">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={selectedProducts[product.id] || 0}
            onAdd={() => onAddProduct(product)}
            onRemove={() => onRemoveProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
