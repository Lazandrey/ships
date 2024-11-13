import express from "express";

import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER_BY_ID,
  INSERT_USER,
  UPDATE_USER_BY_ID,
} from "../controller/user.js";

const router = express.Router();

router.get("/users", GET_ALL_USERS);
router.get("/user/:id", GET_USER_BY_ID);
router.delete("/user/:id", DELETE_USER_BY_ID);
router.post("/user", INSERT_USER);
router.put("/user/:id", UPDATE_USER_BY_ID);

export default router;
