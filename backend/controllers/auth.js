const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign up
exports.signup = async (req, res) => {
    const { username, email, password, interest, location } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, interest, location });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
};

// Sign in
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Sign-in successful', user });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ message: 'Sign-in failed' });
    }
};
