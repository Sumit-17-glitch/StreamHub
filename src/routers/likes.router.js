import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleLike, getLikesCount, getLikedVideos } from "../controllers/likes.controller.js";

const router = Router();

router.route("/toggle-like/:videoId").get(verifyJWT, toggleLike); //works just fine😁
router.route("/get-likes-count/:videoId").get(getLikesCount); //works just fine😁
router.route("/get-liked-videos").get(verifyJWT, getLikedVideos); //works just fine😁

export default router;