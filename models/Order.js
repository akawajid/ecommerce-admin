import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  address: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
}, {
  timestamps: true
});

export const Order = models.Order || mongoose.model("Order", OrderSchema);
