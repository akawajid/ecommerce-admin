import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    res.json({ orders: await Order.find() });
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
