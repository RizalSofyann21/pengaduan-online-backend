const express = require("express");
const masyarakatController = require("../controllers/masyarakatController");

const router = express.Router();

router.post("/", masyarakatController.createMasyarakat);
router.get("/", masyarakatController.getAllMasyarakat);
router.patch("/:id", masyarakatController.updateMasyarakat);
router.delete("/:id", masyarakatController.deleteMasyarakat);

module.exports = router;
