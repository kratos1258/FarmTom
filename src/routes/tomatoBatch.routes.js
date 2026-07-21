import express from "express";

import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";

import tomatoBatchController from "../controllers/tomatoBatch.controller.js";
import {createTomatoBatchSchema,updateTomatoBatchSchema,} from "../validators/tomatoBatch.validator.js";
import upload from "../middlewares/upload.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post("/",authenticate,authorize(ROLES.FARMER),upload.single("image"),validate(createTomatoBatchSchema),
    tomatoBatchController.createBatch);

router.get(
    "/my-batches",
    authenticate,
    authorize(ROLES.FARMER),
    tomatoBatchController.getMyBatches
);

router.get(
    "/:id",
    authenticate,
    tomatoBatchController.getBatch
);

router.patch(
    "/:id",
    authenticate,
    authorize(ROLES.FARMER),
    validate(updateTomatoBatchSchema),
    tomatoBatchController.updateBatch
);

export default router;