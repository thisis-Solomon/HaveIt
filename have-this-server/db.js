import mongoose from "mongoose";

const url = "mongodb://localhost/haveit";

const db = mongoose.connect(
    process.env.MONGO_URL || url,
    {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    },
    () => console.log("DB successfully connected")
);

export default db;
