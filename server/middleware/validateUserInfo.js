module.exports = (req, res, next) => {

    const { email, name, password } = req.body;

    // Check if email is in valid format
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    }

    // Check input data for register and signin forms
    if (req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    } 
    else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    }
    next()
};