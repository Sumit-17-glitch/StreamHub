import mongoose, {Schema} from "mongoose";

const likesSchema = mongoose.Schema({
    likedBy :{
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    likedTo :{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
})

export const Likes = mongoose.model("Likes", likesSchema);