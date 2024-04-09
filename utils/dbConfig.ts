import mongoose, { Connection } from "mongoose";

interface ConnectionStatus {
  isConnected: boolean;
}

const connection: ConnectionStatus = { isConnected: false };

export const connectToDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.DATABASE_URL!);
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected to database");
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
