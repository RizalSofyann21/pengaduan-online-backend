const express = require("express");
const pengaduanController = require("../controllers/pengaduanController");

const router = express.Router();

router.post("/", pengaduanController.createPengaduan);
router.get("/", pengaduanController.getAllPengaduan);
router.get("/masyarakat/:id", pengaduanController.getPengaduanByMasyarakatId);
router.patch("/:id", pengaduanController.updatePengaduan);
router.delete("/:id", pengaduanController.deletePengaduan);

module.exports = router;
