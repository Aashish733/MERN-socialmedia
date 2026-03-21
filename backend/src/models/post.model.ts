import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
   content: {
      type: String,
      required: true,
    },
    image: {
      required: false,
    },
    video: {
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
 
  {
    timestamps: true,
  }
);



export const Post = mongoose.model("Post", postSchema);
