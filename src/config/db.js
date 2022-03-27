const mongoose = require("mongoose");

module.exports = ()=>{
    mongoose.connect("mongodb://localhost:27017/Validation");
}
// "mongodb://localhost:27017/web14"