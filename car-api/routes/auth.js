import express from "express"
import bcrypt from "bcrypt";

let authRoute = express.Router()
import User from "../model/User.js"

authRoute.get("/user-register", (req, res) => {
    console.log("yeah")
    res.render("auth/register", { layout: "adminLayout" })
});

authRoute.post("/user-register", async(req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Perform additional password strength checks
        // For example, minimum length, special characters, etc.
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password does not meet requirements" });
        }

        // Hash the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ name, email, password: hashedPassword, roles });

        // Save the new user to the database
        await newUser.save();

        res.redirect("/login/user-login");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

authRoute.get("/user-logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login/user-login");
});

authRoute.get("/user-login", (req, res) => {

    res.render("auth/login", { layout: "adminLayout", error: null })
})

authRoute.post("/user-login", async(req, res) => {
    try {
        const { email, password } = req.body;


        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {

            return res.render("auth/login", { layout: "adminLayout", error: 1 })
        }

        // Check password validity
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {

            return res.render("auth/login", { layout: "adminLayout", error: 1 })
        }

        // Check if user has a role
        if (user.roles) {
            return res.redirect("/admin/cars");
        } else {
            return res.redirect("/homepage");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default authRoute;