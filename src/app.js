const express = require("express");
const cors = require('cors');
const gridFSRoutes = require("./routes/gridFSRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*', // tu frontend (React/Vite, por ejemplo)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // si necesitas enviar cookies o headers de autenticación
};
app.use(cors(corsOptions));


app.use("/api/v1/vg-hc-store/static-resources", gridFSRoutes);

module.exports = app;