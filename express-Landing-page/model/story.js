const mongoose = require('mongoose')

let storySchema = mongoose.Schema(

    {

        title:{
            type: String
        },
        content:{
            type: String
        }
    }
);
let story = mongoose.model("Stories",storySchema)

module.exports = story;