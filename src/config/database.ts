import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectToDatabase = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

  try {
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectToDatabase;
