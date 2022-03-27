const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id  : {type : Number, unique : true  },
  first_name : {type : String  },
  last_name : {type : String  },
  email : {type : String  },
  pincode : {type : Number },
  age : {type : Number  },
  gender : {type : String , default : "Male"},

},{
  versionKey : false
}
);

module.exports = mongoose.model("user", userSchema);