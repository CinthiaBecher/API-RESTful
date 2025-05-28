const request = require("supertest");
const app = require("../src/index"); // Importa a aplicação Express

describe("Testes de manipulação de tasks", () => {
  let authToken;
  let userID;
  let taskID;

  // Criar usuário e obter token antes dos testes
  beforeAll(async () => {
    // Primeiro criar o usuário
    const createResponse = await request(app).post("/users").send({
      name: "testUserTask",
      username: "testUserTask",
      password: "1234567",
    });
    userID = createResponse.body.id;

    // Depois fazer login para obter o token
    const loginResponse = await request(app).post("/auth/login").send({
      username: "testUserTask",
      password: "1234567",
    });
    authToken = loginResponse.body.token;

    // Criar a task para os testes
  });

  describe("POST /tasks/", () => {
    test("deve retornar 201 quando conseguir criar a task", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1",
          description: "Task 1",
          user_id: userID,
        });
      taskID = response.body.id;
      console.log("Resposta task: ", response.body);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: taskID,
        title: "Task 1",
        description: "Task 1",
        status: "pendente",
        user_id: userID,
      });
    });
  });
});
