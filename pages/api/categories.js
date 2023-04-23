import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?._id) {
      res.json(await Category.findOne({ _id: req.query?._id }));
    } else {
      res.json(await Category.find().populate('parent'));
    }
  } else if (method === "POST") {
    const { name, parent } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent,
    });

    res.json(categoryDoc);
  } else if (method === "PUT") {
    const { _id, name, parent } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent,
      }
    );

    res.json(categoryDoc);
  } else if (method === "DELETE") {
    const { _id } = req.query;
    if (_id) {
      await Category.deleteOne({ _id });
    }

    return res.json(true);
  }
}
