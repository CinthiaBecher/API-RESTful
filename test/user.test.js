const request = require("supertest");
const app = require("../src/index"); // Importa a aplicação Express

describe("Testes de manipulação de usuários", () => {
  describe("POST /users", () => {
    test("deve retornar 201 quando inserir username e senha para criar usuario", async () => {
      const response = await request(app).post("/users").send({
        name: "gabrielle5",
        username: "gabrielle5",
        password: "1234562",
      });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number), // O ID pode ser qualquer número
        name: "gabrielle5",
        username: "gabrielle5",
      });
    });

    test("deve retornar 400 quando inserir usuario que ja está em uso", async () => {
      const response = await request(app).post("/users").send({
        name: "gabrielle5",
        username: "gabrielle5",
        password: "1234562",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Username já está em uso");
    });

    test("deve retornar 422 quando nao inserir nome", async () => {
      const response = await request(app).post("/users").send({
        username: "gabrielle5",
        password: "1234562",
      });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        "Nome, username e password são obrigatórios"
      );
    });

    test("deve retornar 422 quando nao inserir username", async () => {
      const response = await request(app).post("/users").send({
        name: "gabrielle5",
        password: "1234562",
      });
      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        "Nome, username e password são obrigatórios"
      );
    });

    test("deve retornar 422 quando nao inserir senha", async () => {
      const response = await request(app).post("/users").send({
        name: "gabrielle5",
        username: "gabrielle5",
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
});
