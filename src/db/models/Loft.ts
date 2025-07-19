import { Document, Schema, model } from 'mongoose';

export interface ILoft extends Document {
  title: string;
  description?: string;
  thumbnail: string;
  type: 'photo' | 'video';
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
    thumbnail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['photo', 'video'],
      required: true,
    },
  },

  { timestamps: true },
);

export const myPhotoModel = model<ILoft>('My_photo', loftSchema, 'My_photo');
export const photoFromInternetModel = model<ILoft>(
  'Photo_from_internet',
  loftSchema,
  'Photo_from_internet',
);
export const myVideoModel = model<ILoft>('My_video', loftSchema, 'My_video');
export const videoFromInternetModel = model<ILoft>(
  'Video_from_internet',
  loftSchema,
  'Video_from_internet',
);
export const myEquipmentModel = model<ILoft>(
  'My_equipment',
  loftSchema,
  'My_equipment',
);
export const howToDoItModel = model<ILoft>(
  'How_to_do_it_correctly',
  loftSchema,
  'How_to_do_it_correctly',
);
