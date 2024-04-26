import { useEffect, useState } from "react";
import { apiUrl } from "../../../constants";
import { Order } from "../../../types/order.type";
import Button from "../../components/atoms/Button/Button";
import { Link } from "react-router-dom";

const Orders: React.FunctionComponent = () => {
  document.title = "Orders";
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + "/orders");
      const { data } = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (err) {
      setError(String(err));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="mx-auto h-[67.5rem] fixed top-0 bottom-0 left-0 right-0 p-16">
      <Link to="/">
        <Button className="flex flex-wrap w-40 p-4 mb-4 justify-evenly">
          Home
        </Button>
      </Link>
      <section className="bg-background-secondary h-[60rem] rounded-lg shadow-custom text-center p-8">
        <h1 className="text-4xl pb-4">Orders</h1>
        {orders ? (
          orders.map((order) => (
            <Link to={"/orders/" + order.id} key={order.id}>
              <Button className="flex flex-wrap w-full p-4 mb-4 justify-evenly">
                <div>Id: {order.id}</div>
                <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
                <div>Customer Name:{order.customerName}</div>
                <div>Shipping address: {order.address}</div>
              </Button>
            </Link>
          ))
        ) : (
          <div>loading...</div>
        )}
      </section>
    </section>
  );
};

export default Orders;
