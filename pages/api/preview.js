export default async function handler(req, res) {
  const { secret, slug } = req.query;

  // Check the secret
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode
  res.setPreviewData({});

  // Redirect to the path from the fetched entry
  res.redirect(slug || '/');
}
