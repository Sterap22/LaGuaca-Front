import CategoryCarousel from "../molecules/CategoryCarousel";


const ProductCategorySection = ({ products = [], selectedProducts = [], onAddProduct = {}, onRemoveProduct = {} }) => {
    
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {Object.keys(categories).map((category) => (
        <CategoryCarousel
          key={category}
          category={category}
          products={categories[category]}
          selectedProducts={selectedProducts}
          onAddProduct={onAddProduct}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
    </div>
  );
};

export default ProductCategorySection;
