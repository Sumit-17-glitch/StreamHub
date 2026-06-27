import { Router } from "express";
import {
  deleteVideo,
  getVideoById,
  publishVideo,
  togglePublishStatus,
  getAllVideos,
  updateVideo,
  getAllVideosByUserId,
  updateViewsAndWatchHistory
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { optionalAuth } from "../middlewares/optional.middleware.js";

const router = Router();

router.route("/publish-video").post(
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  publishVideo,
); //works just fine😁
router.route("/get-video/:videoId").get(getVideoById); //works just fine😁
router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo); //works just fine😁
router.route("/toggle-published/:videoId").get(verifyJWT, togglePublishStatus); //works just fine😁
router.route("/get-all-videos-user").get(getAllVideosByUserId); //works just fine😁
router
  .route("/update-video/:videoId")
  .patch(upload.single("thumbnail"), verifyJWT, updateVideo); //works just fine😁
router.route("/get-all-videos").get(getAllVideos);
router.route("/update-view-watchHistory/:videoId").get(optionalAuth, updateViewsAndWatchHistory);

export default router;
