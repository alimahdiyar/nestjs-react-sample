import { useEffect, useState } from "react";
import { apiUrl } from "../../../constants";
import { Order } from "../../../types/order.type";
import Button from "../../components/atoms/Button/Button";
import { Link } from "react-router-dom";

const Orders: React.FunctionComponent = () => {
  document.title = "Orders";
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Assuming 10 orders per page, can be adjusted

  const fetchOrders = async (page: number) => {
    try {
      const response = await fetch(
        `${apiUrl}/orders?page=${page}&size=${pageSize}`
      );
      const responseData = await response.json();
      setOrders(responseData.data);
      setTotalPages(responseData.totalPages);
    } catch (err) {
      alert(String(err));
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((current) => (current < totalPages ? current + 1 : current));
  };

  const handlePrevious = () => {
    setCurrentPage((current) => (current > 1 ? current - 1 : current));
  };

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
          <>
            {orders.map((order) => (
              <Link to={"/orders/" + order.id} key={order.id}>
                <Button className="flex flex-wrap w-full p-4 mb-4 justify-evenly">
                  <div>Id: {order.id}</div>
                  <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
                  <div>Customer Name: {order.customerName}</div>
                  <div>Shipping address: {order.address}</div>
                </Button>
              </Link>
            ))}
            <div className="flex justify-center mt-4">
              <Button
                className={"m-4 px-4 py-3"}
                onClick={handlePrevious}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <Button
                className={"m-4 px-4 py-3"}
                onClick={handleNext}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </section>
  );
};

export default Orders;
