import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cookieParser from "cookie-parser";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Mercado Pago Init
const mpAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || "";
const client = new MercadoPagoConfig({ accessToken: mpAccessToken });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mercado Pago Preference Creation
  app.post("/api/checkout/create-preference", async (req, res) => {
    try {
      const { title, price, orderId } = req.body;
      
      const preference = new Preference(client);
      const result = await preference.create({
        body: {
          items: [
            {
              id: orderId,
              title: title,
              unit_price: Number(price),
              quantity: 1,
              currency_id: "BRL"
            }
          ],
          notification_url: `${process.env.APP_URL}/api/webhooks/mercadopago`,
          back_urls: {
            success: `${process.env.APP_URL}/dashboard/buyer?status=success`,
            failure: `${process.env.APP_URL}/dashboard/buyer?status=failure`,
            pending: `${process.env.APP_URL}/dashboard/buyer?status=pending`
          },
          auto_return: "approved"
        }
      });

      res.json({ id: result.id, init_point: result.init_point });
    } catch (error) {
      console.error("MP Error:", error);
      res.status(500).json({ error: "Failed to create preference" });
    }
  });

  // Mercado Pago Webhook
  app.post("/api/webhooks/mercadopago", async (req, res) => {
    const { action, data } = req.body;
    console.log("Mercado Pago Webhook Received:", action, data);
    
    // Here we would use Firebase Admin to update order status
    // Since we are in a browser-agent environment, we should try to use client SDK
    // or provide instructions for the client to poll.
    // For now, let's just acknowledge the event.
    res.status(200).send("OK");
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
