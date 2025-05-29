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

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: taskID,
        title: "Task 1",
        description: "Task 1",
        status: "pendente",
        user_id: userID,
      });
    });
    test("deve retornar 401 quando nao inserir token", async () => {
      const response = await request(app).post("/tasks").send({
        title: "Task 10",
        description: "Task 10",
        user_id: userID,
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Token não fornecido");
    });
    test("deve retornar 401 quando o token inserido for invalido", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${"tokenErrado"}`)
        .send({
          title: "Task 10",
          description: "Task 10",
          user_id: userID,
        });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Token inválido");
    });

    test("deve retornar 201 quando conseguir criar a task com status especifico", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 2",
          description: "Task 2",
          user_id: userID,
          status: "em_andamento",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: "em_andamento",
        user_id: userID,
      });
    });
    test("deve retornar 422 quando nao inserir titulo", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          description: "Task 1",
          user_id: userID,
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toBe("Título é obrigatório");
    });
    test("deve retornar 422 quando nao inserir user ID", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1",
          description: "Task 1",
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toBe("ID do usuário é obrigatório");
    });
    test("deve retornar 404 quando nao encontrar o usuario pela ID", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1",
          description: "Task 1",
          user_id: 9999,
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
    test("deve retornar 400 quando inserir status invalido", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 3",
          description: "Task 3",
          user_id: userID,
          status: "novo",
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Status inválido. Use: pendente, em_andamento ou concluida"
      );
    });
  });
  describe("GET /tasks/:taskId", () => {
    test("deve retornar 200 quando encontrar a task", async () => {
      const response = await request(app)
        .get(`/tasks/${taskID}`) // Usando o ID real do usuário criado
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: taskID,
        title: "Task 1",
        description: "Task 1",
        status: "pendente",
        user_id: userID,
      });
    });
    test("deve retornar 404 quando nao encontrar a task", async () => {
      const response = await request(app)
        .get(`/tasks/${9999}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Tarefa não encontrada");
    });
  });
  describe("GET /tasks?assignedTo=userID", () => {
    test("deve retornar 200 quando encontrar a task", async () => {
      const response = await request(app)
        .get(`/tasks?assignedTo=${userID}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });
    test("deve retornar 404 quando nao encontrar usuario", async () => {
      const response = await request(app)
        .get(`/tasks?assignedTo=${9999}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
  });

  describe("PUT /tasks/:id", () => {
    test("deve retornar 200 quando conseguir atualizar a task com sucesso", async () => {
      const response = await request(app)
        .put(`/tasks/${taskID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1 Atualizada",
          description: "Task 1 Atualizada",
          status: "concluida",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: taskID,
        title: "Task 1 Atualizada",
        description: "Task 1 Atualizada",
        status: "concluida",
        user_id: userID,
      });
    });

    test("deve retornar 404 quando nao encontrar a task", async () => {
      const response = await request(app)
        .put(`/tasks/${999}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1 Atualizada",
          description: "Task 1 Atualizada",
          status: "concluida",
        });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Tarefa não encontrada");
    });

    test("deve retornar 422 quando nao inserir titulo", async () => {
      const response = await request(app)
        .put(`/tasks/${taskID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          description: "Task 1 Atualizada",
          status: "concluida",
        });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe("Título é obrigatório");
    });

    test("deve retornar 400 quando o status inserido for invalido", async () => {
      const response = await request(app)
        .put(`/tasks/${taskID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1 Atualizada",
          status: "errado",
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Status inválido. Use: pendente, em_andamento ou concluida"
      );
    });
  });
  describe("DELETE /tasks/:id", () => {
    test("deve retornar 204 quando deletar task com sucesso", async () => {
      const response = await request(app)
        .delete(`/tasks/${taskID}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(204);
    });

    test("deve retornar 404 quando nao encontrar a tarefa para deletar", async () => {
      const response = await request(app)
        .delete(`/tasks/${999}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Tarefa não encontrada");
    });
  });
});
