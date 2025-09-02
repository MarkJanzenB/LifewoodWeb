export default async function handler(request, response) {
    try {
        // --- VERIFY THIS LINE CAREFULLY ---
        const backendUrl = 'https://lifewoodweb.onrender.com/api/health';

        const fetchResponse = await fetch(backendUrl);

        if (!fetchResponse.ok) {
            throw new Error(`Backend responded with status: ${fetchResponse.status}`);
        }

        console.log(`Successfully pinged backend at ${backendUrl}`);
        response.status(200).json({ message: 'Backend pinged successfully.' });

    } catch (error) {
        console.error('Error pinging backend:', error.message);
        response.status(500).json({ error: 'Failed to ping backend.' });
    }
}