import { useProductsContext } from "../../context/ProductsContext";
import { useState } from "react";
import Button from "../../components/atoms/Button/Button";

type OrderItem = {
  productId: number;
  quantity: number;
};

const HomePage: React.FunctionComponent = () => {
  document.title = "Home";
  const [order, setOrder] = useState<OrderItem[]>([]);
  const { products } = useProductsContext();

  const handleAddProduct = (productId: number) => {
    setOrder((currentOrder) => {
      const index = currentOrder.findIndex(
        (item) => item.productId === productId
      );
      if (index > -1) {
        const newItem = {
          ...currentOrder[index],
          quantity: currentOrder[index].quantity + 1,
        };
        const newOrder = [...currentOrder];
        newOrder[index] = newItem;
        return newOrder;
      } else {
        return [...currentOrder, { productId, quantity: 1 }];
      }
    });
  };

  const handleRemoveProduct = (productId: number) => {
    setOrder((currentOrder) => {
      const index = currentOrder.findIndex(
        (item) => item.productId === productId
      );
      if (index > -1 && currentOrder[index].quantity > 1) {
        const newItem = {
          ...currentOrder[index],
          quantity: currentOrder[index].quantity - 1,
        };
        const newOrder = [...currentOrder];
        newOrder[index] = newItem;
        return newOrder;
      } else if (index > -1) {
        return currentOrder.filter((item) => item.productId !== productId);
      }
      return currentOrder;
    });
  };

  const getProductQuantity = (productId: number) => {
    const item = order.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="w-full h-screen p-16 overflow-auto">
      <section
        className="bg-white h-auto rounded-lg shadow-lg text-center p-8 m-auto"
        style={{ maxWidth: "1200px" }}
      >
        {products === null ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="m-4 p-4 border rounded shadow-lg flex flex-col items-center w-48"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="Product"
                  className="mb-2"
                />
                <div className="font-semibold">{product.name}</div>
                <div className="flex items-center mt-2 ounded-lg">
                  <Button
                    className="w-10"
                    onClick={() => handleAddProduct(product.id)}
                  >
                    +
                  </Button>
                  <div className="mx-4 text-lg font-semibold">
                    {getProductQuantity(product.id)}
                  </div>
                  <Button
                    className="w-10"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    -
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default HomePage;
