import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60000,
  max: 20, // 20 request / menit
});

export default async function handler(req, res) {
  await new Promise(resolve => limiter(req, res, resolve));

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { uid, nominal } = req.body;

  // Sanitasi Input
  const cleanUid = String(uid).replace(/[^0-9]/g, "");

  if (!cleanUid || !nominal)
    return res.status(400).json({ error: "Data tidak lengkap!" });

  res.json({ success: true });
}