"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var errorMiddleware_1 = require("./middleware/errorMiddleware");
var db_1 = __importDefault(require("./config/db"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
db_1.default();
var app = express_1.default();
app.get("/", function (req, res) {
    res.send("API is running...");
});
app.use("/api/products", productRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(("Server running in " + process.env.NODE_ENV + " mode on port " + PORT).yellow.bold));
