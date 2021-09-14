const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      firstname: {
         type: String,
         required: true,
      },
      lastname: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         unique: true,
         required: true,
         lowercase: true,
      },
      gender: {
         type: String,
         required: true,
         validate(value) {
            if (value !== "M" && value !== "F") {
               throw new Error('Please Enter "M" For Male And "F" for Female ');
            }
         },
      },
      mobile: {
         type: Number,
         unique: true,
         required: [true, "What is your contact number?"],
         minlength: 10,
         maxlength: 10,
      },
      email: {
         type: String,
         unique: true,
         required: [true, "first enter email after you are register"],
         validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error("invalid email ");
            }
         },
      },
      password: {
         type: String,
         required: true,
         minlength: 8,
         validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z0-9]/)) {
               throw new Error(
                  "Password must contain at least one letter and one number"
               );
            }
         },
      },
      posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
      comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
      tokens: [
         {
            token: {
               type: String,
               required: true,
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);

userSchema.virtual("Post", {
   ref: "post",
   localField: "_id",
   foreignField: "_id",
});

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
   const user = this;
   try {
      const token = jwt.sign({ _id: user._id.toString() }, "iamsagarkachariya");
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return token;
   } catch (e) {
      console.log(e);
   }
};

// Check Email and Compare Password
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });
   if (!user) {
      throw new Error("please valid email");
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
      throw new Error("incorrect Password");
   } else {
      return user;
   }
};

// Hashing Password
userSchema.pre("save", async function (next) {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }
   next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
