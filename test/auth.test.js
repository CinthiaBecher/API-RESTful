const request = require("supertest");
const app = require("../src/index"); // Importa a aplicação Express

describe("Testes de Autenticação", () => {
  describe("POST /auth/login", () => {
    test("deve retornar erro 422 quando não inserir username e senha", async () => {
      const response = await request(app).post("/auth/login").send({});
      console.log("Resposta1:", response.body); // Log para debug
      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Username e senha são obrigatórios");
    });

    test("deve retornar erro 404 com usuario inválido", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "usuario",
        password: "senha_errada",
      });

      console.log("Resposta2:", response.body); // Log para debug
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Usuário não encontrado");
    });

    test("deve retornar token JWT com credenciais válidas", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "gabrielle5",
        password: "1234562",
      });
      console.log("Resposta3:", response.body); // Log para debug
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.message).toBe("Login realizado com sucesso");
    });
  });
});
