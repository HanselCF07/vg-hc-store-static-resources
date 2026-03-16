const express = require("express");
const cors = require('cors');
const gridFSRoutes = require("./routes/gridFSRoutes");


const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*', // config origin frontend (React/Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need to send cookies or authentication headers
};
app.use(cors(corsOptions));

app.use("/api/v1/vg-hc-store/static-resources", gridFSRoutes);


module.exports = app;