import express from "express";
import { getRelationship, addRelationship, deleteRelationship } from "../controller/relationship.js";

const router = express.Router();

// Middleware to handle CORS preflight OPTIONS request
router.options("/", function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Update with your client's origin
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE"); // Include DELETE method
  res.sendStatus(200);
});

// Route handlers
router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
