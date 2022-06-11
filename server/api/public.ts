import * as express from "express";

/**
 * TODO: Public APIs
 */

const router = express.Router();

router.get("/public-get", (_req, res, next) => {
  console.log("Express route: /public-get");
  try {
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.post("/public-post", async (_req, res, next) => {
  console.log("Express route: /public-post");
  try {
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
