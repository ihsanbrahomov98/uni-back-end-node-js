import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import productController from "./controllers/product.js";
import reviewController from "./controllers/review.js";
import authenticationController from "./controllers/authentication.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOO);
    console.log("MONGOO Connected");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MONGOO not working!");
});
mongoose.connection.on("connected", () => {
  console.log("MONGOO working");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authenticationController);
app.use("/review", reviewController);
app.use("/products", productController);

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5550",
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || 5550, () => {
  connect();
  console.log("back end working");
});
