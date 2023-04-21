import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;

  mongooseConnect();

  switch (method) {
    case "POST":
      const { title, description, price } = req.body;

      const productDoc = await Product.create({
        title,
        description,
        price,
      });
      res.json({ status: "success", data: productDoc });
      break;
    default:
      res.json("Invalid request");
      break;
  }
}
