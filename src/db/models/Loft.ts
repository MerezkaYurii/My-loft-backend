import { Document, Schema, model } from 'mongoose';

export interface ILoft extends Document {
  title: string;
  description?: string;
}

const loftSchema = new Schema<ILoft>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },

  { timestamps: true },
);

const loftCollection = model('my-loft', loftSchema);
export default loftCollection;

// exampleDefault: {
//   type: String,
//   default: false,
//   required: true,
// },
// examplEnum: {
//   type: String,
// enum:["film", 'serial']
//   default: "film",
//   required: true,
// },
