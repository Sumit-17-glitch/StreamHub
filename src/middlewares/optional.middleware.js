import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";

export const optionalAuth = asyncHandler(async(req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
      if(accessToken){
          const verifiedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
          const user = await User.findById(verifiedAccessToken._id).select("-password -refreshtoken");
          if(!user){
              throw new ApiError(401, "Invalid access token");
          }
          req.user = user;
      }
  
      next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
  }
});
