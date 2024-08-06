const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const pool = require("./config/db");
const masyarakatRoutes = require("./routes/masyarakatRoutes");
const pengaduanRoutes = require("./routes/pengaduanRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 3000;
const multer = require("multer");
const path = require("path");
const db = require("./config/db");
const moment = require("moment");

const corsOptions = {
  exposedHeaders: "Content-Disposition",
};

app.use(cors(corsOptions));

app.use("/masyarakat", masyarakatRoutes);
// app.use("/pengaduan", pengaduanRoutes);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/pengaduan", pengaduanRoutes);
// app.use("/api", authRoutes);

////REGISTRASI////
app.post("/registrasi", async (req, res) => {
  const { nama, nik, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const [rows, fields] = await pool.query(
      "SELECT * FROM masyarakat WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return res.status(400).send("Email sudah terdaftar");
    }

    // Jika email belum terdaftar, tambahkan user baru ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO masyarakat (nama, nik, email, password) VALUES (?, ?, ?, ?)",
      [nama, nik, email, hashedPassword]
    );
    res.status(201).send("Berhasil registrasi");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

////LOGIN MASYARAKAT////
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const [rows, fields] = await pool.query(
      "SELECT * FROM masyarakat WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).send("Email atau password salah");
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const user = rows[0];
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, "secretKey", {
        expiresIn: "3d",
      });
      res.json({ token, user });
    } else {
      res.status(401).send("Email atau password salah");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

////LOGIN ADMIN////
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari admin berdasarkan email
    const [rows, fields] = await pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).send("Email atau password salah");
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const admin = rows[0];
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ email: admin.email }, "adminSecretKey", {
        expiresIn: "3d",
      });
      res.json({ token, admin });
    } else {
      res.status(401).send("Email atau password salah");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

////PENGADUAN////
// Rute untuk mendapatkan semua pengaduan
app.get("/pengaduan", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pengaduan");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FIXED
// Rute untuk menambahkan pengaduan baru
app.post("/pengaduan", async (req, res) => {
  const { masalah, keterangan, perusahaan, pemilik, lokasi } = req.body;
  const id_masyarakat = req.user.id; // Ambil id_masyarakat dari user yang sedang login

  try {
    const [result] = await db.query(
      "INSERT INTO pengaduan (id_masyarakat, masalah, keterangan, perusahaan, pemilik, lokasi) VALUES (?, ?, ?, ?, ?, ?)",
      [id_masyarakat, masalah, keterangan, perusahaan, pemilik, lokasi]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk mengupdate status pengaduan
app.put("/pengaduan/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE pengaduan SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    res.status(200).json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unggah gambar
// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const now = moment().format("YYYY-MM-DD_HHimmiss");
    cb(null, now + path.extname(file.originalname)); // Appending extension
  },
});
const upload = multer({ storage: storage });

app.post("/bukti_pengaduan", upload.single("foto"), async (req, res) => {
  console.log("Received file:", req.file); // Log file information
  const foto = req.file ? req.file.filename : null;

  if (!foto) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res
    .status(201)
    .json({ message: "File uploaded successfully", filename: foto });
});

app.get("/", (req, res) => {
  res.send("API sedang berjalan");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server sedang berjalan pada http://localhost:${port}`);
});
