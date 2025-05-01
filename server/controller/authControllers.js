const admin = require('firebase-admin');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userResponse = await admin.auth().createUser({
            email,
            password,
            emailVerified: false,   
            disabled: false
        });
        res.status(201).json(userResponse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const uid = "test-user-id";  // Skip verifyIdToken temporarily
        const { email } = req.body;
        const user = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(user.uid);

        res.status(200).json({ message: "User logged in", uid, token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    signup,
    login,
};