// import mongoose from "mongoose";

// export const initDb = async () => {
//   await mongoose
//     .connect("mongodb://mongo:27017/rethink", { useNewUrlParser: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));
// };

// export default mongoose;

import mongoose from "mongoose";

export const initDb = async () => {
  const connect = async () => {
    return mongoose.connect(
      "mongodb://mongo:27017/rethink",
      { useNewUrlParser: true },
      (err) => {
        if (err) {
          console.error(
            "Failed to connect to mongo - retrying in 5 sec",
            err
          );
          setTimeout(connect, 5000);
        }
      }
    );
  };
  return await connect();
};

export default mongoose;
