import express from 'express';
import { connectToDatabase } from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }      

    try {
        const db = await connectToDatabase();
        // Check if email is already registered
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]
        );

        if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into DB
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]
        );
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('[Signup Error]', err);
        return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
