import express from "express"
import { getMessage, sendMessage, getIntrestedUsers } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/send", protectRoute, sendMessage);
router.get("/", protectRoute, getMessage);

router.get('/getinteresteduser/:id', protectRoute, getIntrestedUsers);


export default router;