const express = require("express");
const router = express.Router();
const mongoose =  require("mongoose");
const Fund = require("../models/Fund");

router.post("/save", async (req, res) => {
  const { sponsor, belongToCampaign, amount } = req.body;
  if (!sponsor) {
    return res
      .status(400)
      .json({ success: false, message: "sponsor is required" });
  }
  if (!belongToCampaign) {
    return res
      .status(400)
      .json({ success: false, message: "belongToCampaign is required" });
  }
  if (!amount) {
    return res
      .status(400)
      .json({ success: false, message: "amount is required" });
  }
  try {
    const fund = new Fund({ sponsor, belongToCampaign, amount });
    await fund.save();
    return res.status(200).json({ success: true, Fund: fund });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/:campaignId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.campaignId)) {
    return res
      .status(400)
      .json({ success: false, message: "campaignId is required" });
  }
  let fund = await Fund.find({ belongToCampaign: req.params.campaignId });
  res.json({ fund });
});
router.get("/history/:sponsorAddress/:campaignId", async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.campaignId)) {
    return res
      .status(400)
      .json({ success: false, message: "campaignId is required" });
  }
  let fund = await Fund.find({
    $and: [
      {
        sponsor: req.params.sponsorAddress,
      },
      {
        belongToCampaign: req.params.campaignId,
      },
    ],
  });
  res.json({ fund });
});
module.exports = router;
