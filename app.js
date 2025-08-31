const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const portfolioRouter = require("./routes/portfolio");

const cors = require("cors");
const app = express();
const { logger, isAuthenticated } = require("./middleware/middlewares");

require("dotenv").config();

app.use(express.json());

const swaggerOptions = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: swaggerOptions, // ✅ not swaggerOptions.definition
  apis: [], // or keep [] unless you use JSDoc comments
});


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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

const corsOptions = {
  origin: ["http://localhost:5173", "https://fix-folio.netlify.app/"],
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
/* app.use("/portfolio", isAuthenticated, portfolioRouter);
 */
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f2hwez3.mongodb.net/fixfolio`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

module.exports = app;
