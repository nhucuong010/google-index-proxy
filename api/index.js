export default async function handler(req, res) {
  // BỔ SUNG cấu hình CORS cho mọi request
  res.setHeader('Access-Control-Allow-Origin', '*'); // hoặc chỉ riêng domain FE
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // BỔ SUNG xử lý cho preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Xử lý logic chính
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url, type } = req.body;
  if (!url || !type) {
    return res.status(400).json({ message: "Missing url or type" });
  }

  // (Bổ sung logic Google Indexing API tại đây)

  res.status(200).json({ message: "Request received", url, type });
}
