export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await res.revalidate('/');
           
            return res.status(200).json({ revalidated: true });
        } catch (error) {
            console.error('Revalidate error:', error);
            return res.status(500).json({ error: 'Failed to revalidate' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}