/* import express from "express";
import Portfolio from "../models/portfolioModel";

const router = express.Router();

// Save or update portfolio
router.post("/", async (req, res) => {
  try {
    const { email, ...portfolioData } = req.body;

    // Check if portfolio already exists
    let portfolio = await Portfolio.findOne({ email });
    if (portfolio) {
      // Update existing
      portfolio.set(portfolioData);
    } else {
      // Create new
      portfolio = new Portfolio({ email, ...portfolioData });
    }

    await portfolio.save();
    res.status(200).json({ success: true, portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get portfolio by email
router.get("/:email", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ email: req.params.email });
    if (!portfolio) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ success: true, portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
 */