import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DATABASE_URL!);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n"); console
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB error -------------------->>>>>>>>>>>>>>>>>>>\n" + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}