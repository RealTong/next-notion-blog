const envPassword = process.env.PASSWORD
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { password } = req.body
  if (password === envPassword) {
    return res.status(200).json({ message: 'Password is correct' })
  } else {
    return res.status(401).json({ message: 'Password is incorrect' })
  }
}
