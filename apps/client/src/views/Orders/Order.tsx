import { useEffect, useState } from "react";
import { apiUrl } from "constants/index";
import { Order as OrderType, OrderItem } from "types/order.type";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "context/ProductsContext";
import Button from "components/atoms/Button/Button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import OrderDocument from "./OrderDocument";
import { Product } from "types/product.type";
import { ProductCard } from "components/molecules/ProductCard/ProductCard";

function OrderPDF({
  order,
  products,
}: {
  order: OrderType;
  products: Product[];
}) {
  const [fontSize, setFontSize] = useState(15);
  return (
    <div>
      <div className="h-[500px] mb-8">
        <PDFViewer className="w-full h-full">
          <OrderDocument
            order={order}
            products={products}
            fontSize={fontSize}
          />
        </PDFViewer>
      </div>
      <label htmlFor="pdf-font-size">Font Size:</label>
      <input
        id="pdf-font-size"
        type="number"
        className="p-2 w-20 border-2 mx-4"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
      <PDFDownloadLink
        document={
          <OrderDocument
            order={order}
            products={products}
            fontSize={fontSize}
          />
        }
        fileName={`order-${order.id}.pdf`}
        className={`p-4 rounded-md border-none text-lg font-medium transition-all duration-300 ease-in-out bg-button-primary text-color-secondary cursor-pointer hover:bg-button-hover hover:text-button-primary`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

const Order: React.FunctionComponent = () => {
  document.title = "Order";
  const [order, setOrder] = useState<OrderType | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (order) {
      setOrderItems(
        order.items.map((item) => ({
          quantity: item.quantity,
          productId: item.productId,
        }))
      );
    }
  }, [order]);

  const params = useParams();
  const fetchOrder = async () => {
    try {
      const response = await fetch(apiUrl + "/orders/" + params["id"]);
      setOrder(await response.json());
    } catch (err) {
      alert(String(err));
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
      if (index > -1) {
        const newItem = {
          ...currentOrder[index],
          quantity: Math.max(currentOrder[index].quantity - 1, 0),
        };
        const newOrder = [...currentOrder];
        newOrder[index] = newItem;
        return newOrder;
      }
      return currentOrder;
    });
  };

  const getProductQuantity = (productId: number) => {
    const item = orderItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleOrderUpdate = () => {
    fetch(`${apiUrl}/orders/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: orderItems,
      }),
    })
      .then((response) => {
        alert("Order updated successfully!");
        response.json().then((data) => setOrder(data));
      })
      .catch((e) => alert(String(e)));
  };

  const navigate = useNavigate();
  const handleOrderDelete = () => {
    const confirmed = confirm("Do you really want to delete this order?");
    if (!confirmed) return;
    fetch(`${apiUrl}/orders/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("Order deleted successfully!");
        navigate("/orders", { replace: true });
      })
      .catch((e) => alert(String(e)));
  };

  const { products } = useProductsContext();

  return (
    <section className="overflow-auto mx-auto min-h-[67.5rem] fixed top-0 bottom-0 left-0 right-0 p-16">
      <Link to="/">
        <Button className="flex flex-wrap w-40 p-4 mb-4 justify-evenly">
          Home
        </Button>
      </Link>
      <section className="bg-background-secondary min-h-[60rem] rounded-lg shadow-custom text-center p-8">
        <h1 className="text-4xl pb-4">Order</h1>
        {order && products !== null ? (
          <>
            <div className="flex flex-wrap w-full p-4 mb-4 justify-evenly rounded-md border-none text-lg font-medium bg-gray-100 text-button-primary">
              <div>Id: {order.id}</div>
              <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div>Customer Name:{order.customerName}</div>
              <div>Shipping address: {order.address}</div>
              <div>
                Total: $
                {order.items
                  .reduce(
                    (a, c) =>
                      a +
                      c.quantity *
                        Number(
                          products.find((p) => p.id === c.productId)
                            ?.pricePerUnit
                        ),
                    0
                  )
                  .toFixed(2)}
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {orderItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return <></>;
                return (
                  <ProductCard
                    key={item.productId}
                    product={product}
                    handleAddProduct={handleAddProduct}
                    getProductQuantity={getProductQuantity}
                    handleRemoveProduct={handleRemoveProduct}
                  />
                );
              })}
            </div>
            <Button
              className={"m-4 px-4 py-3 bg-red-500"}
              onClick={handleOrderDelete}
            >
              Delete Order
            </Button>
            <Button className={"m-4 px-4 py-3"} onClick={handleOrderUpdate}>
              Update Order
            </Button>
            <OrderPDF order={order} products={products} />
          </>
        ) : (
          <div>loading...</div>
        )}
      </section>
    </section>
  );
};

export default Order;
