import express from "express";
import axios from 'axios';
import database from './db.js';
import User from './user.js';
import Conta from './contas.js';
import Cena from './cena.js'
import Comentario from './comentarios.js'
import Sequelize from 'sequelize';

const {Op} = Sequelize;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await database.sync();
app.use((req, res, next) => {
  if (req.body._method && req.body._method.toUpperCase() === 'PUT') {
    req.method = 'PUT';
  }
  next();
});
app.get('/api/comentarios', async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    // Renderize os comentários em um formato adequado (por exemplo, JSON ou HTML) e envie a resposta
    res.json(comentarios);
  } catch (error) {
    console.error('Erro ao buscar os comentários:', error);
    res.status(500).send('Erro ao buscar os comentários');
  }
});
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/comentarios', async (req, res) => {
  const { username, perfil, coment } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, perfil } });
    if (conta) {
      const comentarioCriado = await Comentario.create({ username, perfil, coment });
      const cena = await Cena.findAll();
      const comentario =  await Comentario.findAll();
      res.render('content', { conta: conta, comentario: comentario, cena: cena});
    } else {
      res.send('Invalid username or perfil');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.post('/register', async (req, res) => {
  const { username, password, perfil } = req.body;
  try {
    const conta = await Conta.create({ username, password, perfil });
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/criar-cena', async (req, res) => {
  const { username, perfil, img, texto, fala } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, perfil } });
    if (conta) {
      const cenaCriada = await Cena.create({ username, perfil, img, texto, fala });
      const comentario = await Comentario.findAll();
      const cena = await Cena.findAll();
      res.render('content', { conta: conta, comentario: comentario, cena: cena});
    } else {
      res.send('Invalid');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
    console.log(username)
  }
});

app.get('/configUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Encontre o usuário pelo ID
    const conta = await Conta.findByPk(id);
    if (conta) {
      // Exclua o usuário
      res.render('config', { conta: conta });
    } else {
      res.send('Usuário não encontrado!');
    }
  } catch (error) {
    console.error(error);
    res.send('Ocorreu um erro ao excluir a conta.');
  }
});

app.post('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, perfil } = req.body;
  try {
    // Encontre o usuário pelo ID
    const conta = await Conta.findByPk(id);
    if (conta) {
      // Atualize as informações da conta com os novos valores
      conta.username = username;
      conta.password = password;
      conta.perfil = perfil;
      await conta.save();
      const comentario =  await Comentario.findAll();
      const cena = await Cena.findAll();
      res.render('content', { conta: conta, comentario: comentario, cena: cena })
    } else {
      res.send('Usuário não encontrado!');
    }
  } catch (error) {
    console.error(error);
    res.send('Ocorreu um erro ao atualizar as informações do usuário.');
  }
});

app.post('/login/content', async (req, res) => {
  const { username, password } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    const cena = await Cena.findAll();
    if (conta) {
      res.render('content', { conta: conta, comentario: comentario, cena: cena})
    } else {
      res.send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

app.post('/clear-comment', async (req, res) => {
  try {
    const { username, password } = req.body
    // Encontre o último comentário do usuário logado
    const lastComment = await Comentario.findOne({
      where: { username },
      order: [['createdAt', 'DESC']] // Ordena por data de criação descendente para obter o último comentário
    });

    if (lastComment) {
      // Se existir um último comentário, remova-o
      await lastComment.destroy();
    }
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    const cena = await Cena.findAll();
    res.render('content', { conta: conta, comentario: comentario, cena: cena })
  } catch (error) {
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    const cena = await Cena.findAll();
    console.error(error);
    res.render('content', { conta: conta, comentario: comentario, cena: cena })
  }
});

app.post('/comment', async (req, res) => {
  const { username, perfil, coment } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, perfil } });
    if (conta) {
      const comentarioCriado = await Comentario.create({ username, perfil, coment });
      const cena = await Cena.findAll();
      const comentario =  await Comentario.findAll();
      res.render('content', { conta: conta, comentario: comentario, cena: cena});
    } else {
      res.send('Invalid username or perfil');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.post('/deleteCena', async (req, res) =>{
  try {
    const { username, password } = req.body
    // Encontre o último comentário do usuário logado
    const lastScene = await Cena.findOne({
      where: { username },
      order: [['createdAt', 'DESC']] // Ordena por data de criação descendente para obter o último comentário
    });

    if (lastScene) {
      // Se existir um último comentário, remova-o
      await lastScene.destroy();
    }
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    const cena = await Cena.findAll();
    res.render('content', { conta: conta, comentario: comentario, cena: cena })
  } catch (error) {
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    console.error(error);
    res.render('content', { conta: conta, comentario: comentario })
  }
});

app.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Encontre o usuário pelo ID
    const user = await User.findByPk(id);
    if (user) {
      // Exclua o usuário
      await user.destroy();
      res.send('Conta excluída com sucesso!');
    } else {
      res.send('Usuário não encontrado!');
    }
  } catch (error) {
    console.error(error);
    res.send('Ocorreu um erro ao excluir a conta.');
  }
});



















// Listar todos os usuários
app.get('/pessoa', async (req, res) => {
    const pessoa = await User.findAll();
    res.render('index', { pessoa });
  });
  
  // Exibir formulário de criação de usuário
  app.get('/pessoa/create', (req, res) => {
    res.render('create');
  });
  
  // Criar um novo usuário
  app.post('/pessoa', async (req, res) => {
    const { nome, senha, perfil } = req.body;
    await User.create({ nome, senha, perfil});
    res.redirect('/pessoa');
  });
  
  // Exibir formulário de edição de usuário
  app.get('/pessoa/:id/edit', async (req, res) => {
    const { id } = req.params;
    const pessoa = await User.findByPk(id);
    res.render('edit', { pessoa });
  });
  
  // Atualizar um usuário
  app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const  { name, email, status, matricula, data }  = req.body;
    await User.update({ name, email, status, matricula, data }, { where: { id } });
    res.redirect('/pessoa');
  });
  
  // Excluir um usuário
  app.get('/pessoa/:id/delete', async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.redirect('/pessoa');
  });
  app.post('/pessoa/seach', async (req, res) => {
    const { name } = req.body;
    const pessoa = await User.findAll({ where: {name: { [Op.like]:`%${name}%`}}})
    res.render('index', { pessoa })
  });

export default app;