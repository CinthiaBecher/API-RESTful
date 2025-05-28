const request = require("supertest");
const app = require("../src/index"); // Importa a aplicação Express

describe("Testes de manipulação de usuários", () => {
  let authToken;
  let userID;

  // Criar usuário e obter token antes dos testes
  beforeAll(async () => {
    // Primeiro criar o usuário
    const createResponse = await request(app).post("/users").send({
      name: "testuser",
      username: "testuser",
      password: "123456",
    });
    userID = createResponse.body.id;

    // Depois fazer login para obter o token
    const loginResponse = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "123456",
    });
    authToken = loginResponse.body.token;
  });

  describe("POST /users", () => {
    test("deve retornar 200 quando inserir username e senha para criar usuario", async () => {
      const response = await request(app).post("/users").send({
        name: "testuser2",
        username: "testuser2",
        password: "senha12878",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: "testuser2",
        username: "testuser2",
      });
    });

    test("deve retornar 400 quando inserir usuario que ja está em uso", async () => {
      const response = await request(app).post("/users").send({
        name: "testuser",
        username: "testuser",
        password: "1234562",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Username já está em uso");
    });

    test("deve retornar 422 quando nao inserir nome", async () => {
      const response = await request(app).post("/users").send({
        username: "testuser",
        password: "1234562",
      });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        "Nome, username e password são obrigatórios"
      );
    });

    test("deve retornar 422 quando nao inserir username", async () => {
      const response = await request(app).post("/users").send({
        name: "testuser",
        password: "1234562",
      });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        "Nome, username e password são obrigatórios"
      );
    });

    test("deve retornar 422 quando nao inserir senha", async () => {
      const response = await request(app).post("/users").send({
        name: "testuser",
        username: "testuser",
      });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        "Nome, username e password são obrigatórios"
      );
    });

    test("deve retornar 400 quando nome tiver menos que 3 caracteres", async () => {
      const response = await request(app).post("/users").send({
        name: "oi",
        username: "ola",
        password: "1234562",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Nome deve ter pelo menos 3 caracteres");
    });

    test("deve retornar 400 quando username tiver menos que 3 caracteres", async () => {
      const response = await request(app).post("/users").send({
        name: "ola",
        username: "oi",
        password: "1234562",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Username deve ter pelo menos 3 caracteres"
      );
    });

    test("deve retornar 400 quando password tiver menos que 6 caracteres", async () => {
      const response = await request(app).post("/users").send({
        name: "ola",
        username: "ola",
        password: "12345",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Senha deve ter pelo menos 6 caracteres"
      );
    });
  });
  describe("GET /users/:id", () => {
    test("deve retornar 200 quando encontrar um usuario com o ID", async () => {
      const response = await request(app)
        .get(`/users/${userID}`) // Usando o ID real do usuário criado
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: userID,
        name: "testuser",
        username: "testuser",
      });
    });
    test("deve retornar 404 quando nao encontrar o usuario com o ID", async () => {
      const response = await request(app)
        .get(`/users/${9999}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });
  });
  describe("PUT /users/:id", () => {
    test("deve retornar 404 quando nao encontrar o usuario com o ID", async () => {
      const updateData = {
        name: "User Test Atualizado",
        username: "User Test Atualizado",
        password: "123456",
      };

      const response = await request(app)
        .put(`/users/${9999}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });

    test("deve retornar 400 quando nome tiver menos que 3 caracteres", async () => {
      const updateData = {
        name: "oi",
        username: "User Test Atualizado",
        password: "123456",
      };

      const response = await request(app)
        .put(`/users/${userID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Nome deve ter pelo menos 3 caracteres");
    });

    test("deve retornar 400 quando username tiver menos que 3 caracteres", async () => {
      const updateData = {
        name: "User Test Atualizado",
        username: "oi",
        password: "123456",
      };

      const response = await request(app)
        .put(`/users/${userID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Username deve ter pelo menos 3 caracteres"
      );
    });

    test("deve retornar 400 quando password tiver menos que 6 caracteres", async () => {
      const updateData = {
        name: "User Test Atualizado",
        username: "User Test Atualizado",
        password: "1234",
      };

      const response = await request(app)
        .put(`/users/${userID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Senha deve ter pelo menos 6 caracteres"
      );
    });

    test("deve retornar 200 quando conseguir atualizar o usuario com sucesso", async () => {
      const updateData = {
        name: "User Test Atualizado",
        username: "User Test Atualizado",
        password: "12345678",
      };

      const response = await request(app)
        .put(`/users/${userID}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      console.log("Resposta1:", response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: userID,
        name: "User Test Atualizado",
        username: "User Test Atualizado",
      });
    });
  });
});
