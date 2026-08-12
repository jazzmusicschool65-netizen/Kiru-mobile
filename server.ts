import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// In-memory store for orders (for demo persistence)
let ordersDatabase: any[] = [];

// AI Customer Specialist Assistant Route
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { prompt, currentProducts } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const systemInstruction = `You are "Kiru AI", the official 24/7 intelligent sales & customer support specialist for "Kiru Mobile", a premier electronics & smartphone e-commerce store located in Hossana, Ethiopia.

Your job:
1. Provide warm, expert, friendly, and honest technological advice in English or Amharic (if the user speaks Amharic).
2. Help customers find smartphones (iPhone, Samsung Galaxy, Xiaomi, Tecno, Infinix, Oppo, Vivo, Realme, Nokia), accessories, and electronics within their budget in Ethiopian Birr (ETB).
3. Compare product specifications, camera capabilities, gaming performance (e.g., Helio G99 vs Dimensity), battery life, and charging speeds.
4. Explain delivery options in Hossana (express 1-2 hours), regional SNNPR shipping, and payment options (Telebirr merchant ID 554890, CBE Birr, Bank Transfer, Cash on Delivery).
5. Highlight Kiru Mobile trust factors: 100% original products with 1-Year Local Warranty in Hossana.

Catalog Knowledge:
${JSON.stringify(currentProducts || [], null, 2)}

Format Instructions:
Respond in clear, helpful natural language. At the end of your response, if you recommend any specific products from the catalog provided above, include a JSON block on a new line formatted strictly as:
RECOMMENDED_IDS: ["product-id-1", "product-id-2"]

Example user prompt: "I need a gaming phone under 15,000 ETB"
Your answer should highlight Tecno Spark 20 Pro (Helio G99, 108MP, 8GB RAM, 14,800 ETB) and explain why it is perfect for gaming, then include RECOMMENDED_IDS: ["km-sp-04"].`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm here to help with your Kiru Mobile inquiry! Could you please specify your budget or preferred brand?";

    // Extract recommended product IDs if present
    let recommendedIds: string[] = [];
    const match = replyText.match(/RECOMMENDED_IDS:\s*(\[.*?\])/s);
    if (match) {
      try {
        recommendedIds = JSON.parse(match[1]);
      } catch (e) {
        // Fallback parsing
      }
    }

    // Clean text for user display
    const cleanText = replyText.replace(/RECOMMENDED_IDS:\s*\[.*?\]/g, '').trim();

    return res.json({
      text: cleanText,
      recommendedIds,
    });
  } catch (error: any) {
    console.error("Gemini AI error:", error);
    return res.status(500).json({
      error: "Failed to query Kiru AI Specialist",
      details: error?.message || "Internal server error"
    });
  }
});

// Orders API Routes
app.get("/api/orders", (req, res) => {
  res.json({ orders: ordersDatabase });
});

app.post("/api/orders", (req, res) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.id) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  
  // Check if existing order to update or insert
  const existingIdx = ordersDatabase.findIndex(o => o.id === newOrder.id);
  if (existingIdx >= 0) {
    ordersDatabase[existingIdx] = { ...ordersDatabase[existingIdx], ...newOrder, updatedAt: new Date().toISOString() };
  } else {
    ordersDatabase.unshift(newOrder);
  }

  res.json({ success: true, order: newOrder });
});

app.patch("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const order = ordersDatabase.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, order });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kiru Mobile Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
