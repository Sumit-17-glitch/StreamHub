import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Likes } from "../models/likes.model.js";
import ApiError from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const toggleLike = asyncHandler(async (req, res) => {
  //get user id and video id from request
  const userId = req.user?._id;
  const videoId = req.params?.videoId;

  //check if already liked or not
  const like = await Likes.findOne({
    likedBy: userId,
    likedTo: videoId,
  });

  //if already liked then unlike and if not liked then like the video
  if (like) {
    await like.deleteOne();
    return res
      .status(200)
      .json(new apiResponse(200, {}, "unliked successfully"));
  }

  //like the video
  const newLike = await Likes.create({
    likedBy: userId,
    likedTo: videoId,
  });

  //return response
  return res
    .status(200)
    .json(new apiResponse(200, { newLike }, "liked successfully"));
});

const getLikesCount = asyncHandler(async (req, res) => {
  //get video id from request
  const videoId = req.params?.videoId;

  //get likes count for the video
  const likesCount = await Likes.countDocuments({
    likedTo: videoId,
  });

  //return likes count in response
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { likesCount },
        "likes count retrieved successfully",
      ),
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //get user id from request
  const userId = req.user?._id;

  //get liked videos of the user using aggregation
  const likedVideos = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedBy",
        as: "likedVideos",
      },
    },
  ]);

  //return liked videos in response
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        likedVideos[0].likedVideos,
        "liked videos fetched successfully",
      ),
    );
});

export { toggleLike, getLikesCount, getLikedVideos };
