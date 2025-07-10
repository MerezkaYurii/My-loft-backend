import mongoose from 'mongoose';
import { getEnvVar } from 'utils/getEnvVar';

export const initMongoConnection = async (): Promise<void> => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const name = getEnvVar('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${name}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Succesfulli connection to database');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('❌ MongoDB connection error:', error.message);
    } else {
      console.error('❌ Unknown error during MongoDB connection');
    }

    throw error;
  }
};
