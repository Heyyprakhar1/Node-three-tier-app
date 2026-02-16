const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  // GET all tasks
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
      );
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  });

  // POST new task
  router.post("/", async (req, res) => {
    const { title } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
        [title]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  });

  // DELETE task
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  });

  return router;
};

