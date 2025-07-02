import mongoose from "mongoose";
import { Password } from "../services/password";

// 1. Interface for attributes required to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// 2. Interface for the User Document (i.e., what a saved user looks like)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// 3. Interface for the User Model (i.e., the static methods on the model)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// 4. Define Schema
const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done(); // remember to call done()
});

// 5. Add a custom build method for type-safe construction
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// 6. Create the model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// 7. Export the model
export { User };
