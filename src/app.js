const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (for demo/testing)
let todos = [];
let nextId = 1;

// Create
app.post("/todos", (req, res) => {
  const { title = "", done = false } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  const todo = { id: nextId++, title, done: Boolean(done) };
  todos.push(todo);
  return res.status(201).json(todo);
});

// Read all
app.get("/todos", (_req, res) => {
  res.json(todos);
});

// Read one
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});

// Update
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "not found" });

  const { title, done } = req.body || {};
  if (title !== undefined) {
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "title must be string" });
    }
    todo.title = title;
  }
  if (done !== undefined) {
    todo.done = Boolean(done);
  }
  res.json(todo);
});

// Delete
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const [removed] = todos.splice(idx, 1);
  res.json(removed);
});

// Health endpoint (for smoke checks)
app.get("/health", (_req, res) => res.json({ ok: true }));

// Helper for tests to reset state
app.post("/__reset", (_req, res) => {
  todos = [];
  nextId = 1;
  res.json({ ok: true });
});

module.exports = app;
