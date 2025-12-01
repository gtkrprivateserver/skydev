export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send("Method Not Allowed");

  const { title, text, webhook } = req.body;

  if (!title || !text || !webhook)
    return res.status(400).send("Missing fields");

  const send = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📢 **${title}**\n${text}`
    })
  });

  res.status(send.ok ? 200 : 500).send("Sent");
}