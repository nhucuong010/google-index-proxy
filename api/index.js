export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { url, type } = req.body;
  if (!url || !type) {
    return res.status(400).json({ message: "Missing url or type" });
  }
  // (Logic Google Indexing API bạn bổ sung sau)
  res.status(200).json({ message: "Request received", url, type });
}
