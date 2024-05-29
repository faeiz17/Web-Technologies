import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: false,
        // enum: [
        //     "IT Manager/Director",
        //     "Software Developer/Engineer",
        //     "Systems Administrator",
        //     "Database Administrator (DBA)",
        //     "Network Engineer",
        //     "Cybersecurity Analyst",
        //     "Business Analyst",
        //     "Quality Assurance (QA) Engineer",
        //     "Project Manager",
        //     "Technical Support Specialist"
        // ]
    }
});

const User = mongoose.model("User", userSchema);

export default User;