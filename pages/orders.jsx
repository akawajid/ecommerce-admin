import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get("/api/orders");
    setOrders(response?.data?.orders || []);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="my-4 p-6">
        <h1>Orders</h1>
        <table className="basic">
          <thead>
            <tr>
              <td>Index</td>
              <td>Order No</td>
              <td>Date</td>
              <td>Paid</td>
              <td>Shipping Detail</td>
              <td>Products</td>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((order, i) => {
                const {
                  name,
                  email,
                  address,
                  streetAddress,
                  city,
                  country,
                  line_items,
                } = order;
                console.log('order:', order);
                const products_detail = [];
                const recipient_detail = [];
                line_items.forEach((item) => {
                  console.log('line_item:', item);
                  products_detail.push(
                    `${item?.price_data?.product_data?.name} X ${item?.quantity}`
                  );

                  recipient_detail.push(
                    `${name}, ${email}\r\n${streetAddress}\r\n${address},${city}, ${country}`
                  );
                });
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{order._id.slice(-6)}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      {order.paid ? (
                        <span className="text-green-700 text-bold">YES</span>
                      ) : (
                        <span className="text-red-500 font-bold">NO</span>
                      )}
                    </td>
                    <td>
                      <div className="whitespace-pre">
                        {recipient_detail.join("\r\n")}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-pre">
                        {products_detail.join("\r\n")}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="italic">
                  No orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
