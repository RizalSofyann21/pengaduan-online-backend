const adminModel = require("../models/adminModel");

const getAllAdmin = (req, res) => {
  adminModel.getAllAdmin((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

module.exports = {
  getAllAdmin,
};
