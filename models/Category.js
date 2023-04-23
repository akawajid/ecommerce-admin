import mongoose, {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref:'Category'},
});

export const Category = models?.Category || mongoose.model('Category', CategorySchema);
