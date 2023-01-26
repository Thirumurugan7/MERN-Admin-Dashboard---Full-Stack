import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
// Configurations

dotenv.config();
const app = express();
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //for cross-origin requests
app.use(morgan("common")); //for api calls from different server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("management", managementRoutes);
app.use("/sales", salesRoutes);

// Setting up Mongoose

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Due to ${error} connection not successfull!`);
  });
