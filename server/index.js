import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
