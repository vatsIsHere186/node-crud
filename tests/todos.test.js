const request = require("supertest");
const app = require("../src/app");

beforeEach(async () => {
  await request(app).post("/__reset");
});

test("POST /todos creates a todo", async () => {
  const res = await request(app).post("/todos").send({ title: "Write tests" });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe("Write tests");
  expect(res.body.done).toBe(false);
});

test("GET /todos returns list", async () => {
  await request(app).post("/todos").send({ title: "A" });
  await request(app).post("/todos").send({ title: "B", done: true });
  const res = await request(app).get("/todos");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(2);
});

test("PUT /todos/:id updates fields", async () => {
  const { body } = await request(app).post("/todos").send({ title: "Old" });
  const res = await request(app)
    .put(`/todos/${body.id}`)
    .send({ title: "New", done: true });
  expect(res.status).toBe(200);
  expect(res.body.title).toBe("New");
  expect(res.body.done).toBe(true);
});

test("DELETE /todos/:id removes item", async () => {
  const { body } = await request(app).post("/todos").send({ title: "X" });
  const res = await request(app).delete(`/todos/${body.id}`);
  expect(res.status).toBe(200);
  const list = await request(app).get("/todos");
  expect(list.body).toEqual([]);
});
