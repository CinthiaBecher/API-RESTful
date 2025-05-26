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
      // Nota: Este teste pode precisar de ajustes dependendo das credenciais válidas no seu banco
      const response = await request(app).post("/auth/login").send({
        username: "teste@exemplo.com", // Substitua por um username válido do seu banco
        password: "senha123", // Substitua por uma senha válida do seu banco
      });
      console.log("Resposta3:", response.body); // Log para debug
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.error).toBe("Login realizado com sucesso");
    });
  });
});
