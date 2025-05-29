const request = require("supertest");
const app = require("../src/index"); // Importa a aplicação Express

describe("Testes de Autenticação", () => {
  const testUser = {
    name: "Usuario Login",
    username: "testlogin",
    password: "senha12345",
  };

  // Cria o usuário antes de todos os testes
  beforeAll(async () => {
    await request(app).post("/users").send(testUser);
  });

  describe("POST /auth/login", () => {
    test("deve retornar erro 422 quando não inserir username e senha", async () => {
      const response = await request(app).post("/auth/login").send({});

      expect(response.status).toBe(422);
      expect(response.body.error).toBe("Username e senha são obrigatórios");
    });

    test("deve retornar erro 404 com usuario inválido", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "usuario_errado",
        password: "senha12345",
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Usuário não encontrado");
    });

    test("deve retornar erro 401 com senha incorreta", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "testlogin",
        password: "senha_errada",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Senha incorreta");
    });

    test("deve retornar token JWT com credenciais válidas", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "testlogin",
        password: "senha12345",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.message).toBe("Login realizado com sucesso");
    });
  });
});
