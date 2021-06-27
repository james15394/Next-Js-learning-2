import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getData = ({ params }: { params: { id: string } }) => {
  return fetch(`http://localhost:3000/api/${params.id}`);
};
export const getDataAll = () => {
  return fetch(`http://localhost:3000/api`);
};
export default connectDB;
