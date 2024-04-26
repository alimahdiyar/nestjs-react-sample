import { Product } from "../../../../types/product.type";
import Button from "../../atoms/Button/Button";

export function ProductCard({
  product,
  handleAddProduct,
  getProductQuantity,
  handleRemoveProduct,
}: {
  product: Product;
  handleAddProduct: (productId: number) => void;
  getProductQuantity: (productId: number) => number;
  handleRemoveProduct: (productId: number) => void;
}) {
  return (
    <div className="m-4 p-4 border rounded shadow-lg flex flex-col items-center w-48">
      <img
        src="https://via.placeholder.com/150"
        alt="Product"
        className="mb-2"
      />
      <div className="font-semibold">
        {product.name} ${product.pricePerUnit.toFixed(2)}
      </div>
      <div className="flex items-center mt-2 rounded-lg">
        <Button
          className="px-4 py-2"
          onClick={() => handleAddProduct(product.id)}
        >
          +
        </Button>
        <div className="mx-4 text-lg font-semibold">
          {getProductQuantity(product.id)}
        </div>
        <Button
          className="px-4 py-2"
          onClick={() => handleRemoveProduct(product.id)}
        >
          -
        </Button>
      </div>
    </div>
  );
}
