import express from "express";

import {
  GET_ALL_SHIPS,
  GET_SHIP_BY_ID,
  DELETE_SHIP_BY_ID,
  INSERT_SHIP,
  UPDATE_SHIP_BY_ID,
  GET_RANDOM_SHIP,
} from "../controller/ship.js";

const router = express.Router();

router.get("/ships", GET_ALL_SHIPS);
router.get("/ship/:id", GET_SHIP_BY_ID);
router.delete("/ship/:id", DELETE_SHIP_BY_ID);
router.post("/ship", INSERT_SHIP);
router.put("/ship/:id", UPDATE_SHIP_BY_ID);
router.get("/randomship/", GET_RANDOM_SHIP);

export default router;
