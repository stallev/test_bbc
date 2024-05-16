import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Send a message back to the client
    res.status(200).json({ message: 'Server time logger is running' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Function to log the current time every 2 seconds
function logCurrentTime() {
  setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    console.log('Current Time:', currentTime);
  }, 2000);
}

// Start the time logger when this module is loaded
logCurrentTime();
