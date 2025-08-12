const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cors = require("cors");
const app = express();
const { logger, isAuthenticated } = require("./middleware/middlewares");

// to use env variables
require("dotenv").config();
    
app.use(express.json());

/* const swaggerOptions = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: swaggerOptions.definition,
  apis: swaggerOptions.apis,
});

// Configure Swagger UI with CDN assets
const swaggerUiOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ],
  swaggerOptions: {
    url: undefined,
    spec: specs,
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions)); */

const corsOptions = {
  origin: ["http://localhost:5173", "https://fixfolio.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger);

app.get("/", (_req, res) => {
  res.send("Hello World! 🌍");
});

app.use("/users", userRouter);
app.use("/tasks", isAuthenticated, router);

mongoose
  .connect(
    `mongodb+srv://${process.env.username}:${process.env.db_password}@cluster0.jcdyb7l.mongodb.net/`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));