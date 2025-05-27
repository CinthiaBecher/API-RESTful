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
      console.log("Resposta1:", response.body); // Log para debug
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
      console.log("Resposta1:", response.body); // Log para debug
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Username já está em uso");
    });
  });
});
