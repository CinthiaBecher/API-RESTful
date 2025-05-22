const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async findAll() {
    return await this.taskRepository.findAll();
  }

  async create({ title, description, status = 'pendente' }) {
    if (!title) {
      throw new Error('Título é obrigatório');
    }

    const validStatuses = ['pendente', 'em_andamento', 'concluida'];
    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido. Use: pendente, em_andamento ou concluida');
    }

    return await this.taskRepository.create({ title, description, status });
  }

  async findById(id) {
    const task = await this.taskRepository.findById(id);
    
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return task;
  }

  async update(id, { title, description, status }) {
    if (!title) {
      throw new Error('Título é obrigatório');
    }

    const validStatuses = ['pendente', 'em_andamento', 'concluida'];
    if (status && !validStatuses.includes(status)) {
      throw new Error('Status inválido. Use: pendente, em_andamento ou concluida');
    }

    const task = await this.findById(id);
    return await this.taskRepository.update(id, { title, description, status });
  }

  async delete(id) {
    const task = await this.findById(id);
    return await this.taskRepository.delete(id);
  }
}

module.exports = new TaskService(); 