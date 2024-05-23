import gpsroutes from "./gpsroutes.js";

const configRoutes = (app) => {
  app.use("/gpsstatus", gpsroutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default configRoutes;
