const TaskRepository = require("../repositories/TaskRepository");
const UserRepository = require("../repositories/UserRepository");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  async findByUserId(userId) {
    if (!userId) {
      throw new Error("ID do usuário é obrigatório");
    }

    // Verificar se o usuário existe antes de buscar suas tarefas
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return await this.taskRepository.findByUserId(userId);
  }

  async create({ title, description, status = "pendente", user_id }) {
    if (!title) {
      throw new Error("Título é obrigatório");
    }

    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }

    // Verificar se o usuário existe
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const validStatuses = ["pendente", "em_andamento", "concluida"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        "Status inválido. Use: pendente, em_andamento ou concluida"
      );
    }

    return await this.taskRepository.create({
      title,
      description,
      status,
      user_id,
    });
  }

  async findById(id) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    return task;
  }

  async update(id, { title, description, status }) {
    if (!title) {
      throw new Error("Título é obrigatório");
    }

    const validStatuses = ["pendente", "em_andamento", "concluida"];
    if (status && !validStatuses.includes(status)) {
      throw new Error(
        "Status inválido. Use: pendente, em_andamento ou concluida"
      );
    }

    // Buscar a tarefa existente para manter o user_id
    const existingTask = await this.findById(id);
    if (!existingTask) {
      throw new Error("Tarefa não encontrada");
    }

    // Atualizar mantendo o user_id original
    return await this.taskRepository.update(id, {
      title,
      description,
      status,
      user_id: existingTask.user_id,
    });
  }

  async delete(id) {
    const task = await this.findById(id);
    return await this.taskRepository.delete(id);
  }
}

module.exports = new TaskService();
