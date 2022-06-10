const router = require("express").Router()

const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validateUserInfo = require("../middleware/validateUserInfo")
const authorization = require("../middleware/authorization")

// Register Route
router.post("/register", validateUserInfo, async(req, res) => {
    try {
        
        // Deconstruct request body
        const { name, email, password } = req.body;

        // Get user from database
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
            [email]
        );

        // Check if user exits
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
        
        // Create new user
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
            
        // Generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// Login Route
router.post("/login", validateUserInfo, async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect")
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
});

// Verify a users jwt token
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
});

module.exports = router;