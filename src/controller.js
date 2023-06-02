import User from '../models/User';

// Função para criar um novo usuário
async function createUser(req, res) {
  try {
    const { nome, senha, perfil } = req.body;
    const newUser = await User.create({ nome, senha, perfil });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

// Função para obter todos os usuários
async function listUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
}

// Função para obter um usuário específico
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
}

// Função para atualizar um usuário
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { nome, senha, perfil } = req.body;
    const [rowsUpdated] = await User.update({ nome, senha, perfil }, { where: { id } });
    if (rowsUpdated === 1) {
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
}

// Função para excluir um usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const rowsDeleted = await User.destroy({ where: { id } });
    if (rowsDeleted === 1) {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
}

export default controller; 