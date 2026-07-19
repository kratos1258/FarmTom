import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { ROLES } from "../constants/roles.js";
import { SALT_ROUNDS } from "../constants/auth.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
       validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address."
        }
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    roles: {
      type: [{
          type: String,
          enum: [
              ROLES.FARMER,
              ROLES.BUYER,
              ROLES.LOGISTICS_PROVIDER,
              ROLES.WAREHOUSE_OPERATOR,
          ],
      }],
      required: true,
  },

    profileImage: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
        type: String,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;

        return ret;
    },
});

const User = mongoose.model("User", userSchema);

export default User;