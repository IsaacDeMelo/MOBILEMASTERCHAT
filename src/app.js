import express from "express";
import database from './db.js';
import User from './user.js';
import Conta from './Contas.js';
import Comentario from './comentarios.js'
import Sequelize from 'sequelize';

const {Op} = Sequelize;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
await database.sync();
app.use((req, res, next) => {
  if (req.body._method && req.body._method.toUpperCase() === 'PUT') {
    req.method = 'PUT';
  }
  next();
});

app.get('/', (req, res) => {
  res.render('index');
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

app.post('/login/content', async (req, res) => {
  const { username, password } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    if (conta) {
      res.render('content', { conta: conta, comentario: comentario })
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
    res.render('content', { conta: conta, comentario: comentario })
  } catch (error) {
    const conta = await Conta.findOne({ where: { username, password } });
    const comentario =  await Comentario.findAll();
    console.error(error);
    res.render('content', { conta: conta, comentario: comentario })
  }
});

app.post('/comment', async (req, res) => {
  const { username, perfil, coment } = req.body;
  try {
    const conta = await Conta.findOne({ where: { username, perfil } });
    if (conta) {
      const comentarioCriado = await Comentario.create({ username, perfil, coment });
      const comentario =  await Comentario.findAll();
      res.render('content', { conta: conta, comentario: comentario});
    } else {
      res.send('Invalid username or perfil');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
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