import { useProductsContext } from "context/ProductsContext";
import { useState } from "react";
import Button from "components/atoms/Button/Button";
import LogoutButton from "components/atoms/Button/LogoutButton";
import { apiUrl } from "constants/index";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "components/molecules/ProductCard/ProductCard";

type OrderItem = {
  productId: number;
  quantity: number;
};

const HomePage: React.FunctionComponent = () => {
  document.title = "Home";
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const { products } = useProductsContext();

  const handleAddProduct = (productId: number) => {
    setOrderItems((currentOrder) => {
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
    setOrderItems((currentOrder) => {
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
    const item = orderItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const navigate = useNavigate();
  const handleOrderSubmit = () => {
    fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        address,
        items: orderItems,
      }),
    })
      .then(() => {
        alert("Order submitted successfully!");
        navigate("/orders");
      })
      .catch((e) => alert(String(e)));
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <section className="md:w-3/4 w-full p-16 overflow-auto">
        <Link to="/orders/">
          <Button className="flex flex-wrap w-40 p-4 mb-4 justify-evenly">
            View Orders
          </Button>
        </Link>
        <div
          className="bg-white h-auto rounded-lg shadow-lg text-center p-8 m-auto"
          style={{ maxWidth: "1200px" }}
        >
          {products === null ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddProduct={handleAddProduct}
                  getProductQuantity={getProductQuantity}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))}
            </div>
          )}
        </div>
        <LogoutButton className="py-2 w-20 mt-2" />
      </section>
      <section className="md:w-1/4 w-full min-h-64 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Current Order</h2>
        {orderItems.length ? (
          <ul>
            {orderItems.map((item) => {
              const product = products?.find((p) => p.id === item.productId);
              if (!product) return <></>;
              return (
                <li key={item.productId} className="mb-2">
                  {product.name}: {item.quantity} ($
                  {(item.quantity * product.pricePerUnit).toFixed(2)})
                </li>
              );
            })}
          </ul>
        ) : (
          <div>Empty</div>
        )}
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="mt-4 p-2 w-full"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="mt-4 p-2 w-full"
        />
        <Button
          className={"mt-4 py-2 w-full"}
          onClick={handleOrderSubmit}
          disabled={orderItems.length === 0 || !customerName || !address}
        >
          Submit Order
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
