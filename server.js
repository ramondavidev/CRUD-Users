const express = require('express');
const app = express();
const crypto = require('crypto');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

var hashPwd = function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha256', salt);
    const pw = hmac.update(pwd).digest('hex');
    return pw;
};

//ROUTES//
app.get('/users/auth', auth, async(req, res) => {
    try {
        const user = await pool.query('SELECT * FROM usert WHERE user_id = $1', [req.user.id]);
        return res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//Log a user
app.post('/users/auth', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM usert WHERE username = $1', [username]);

        if (!user.rows[0]) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Dados incorretos!' }] });
          }

        var passHash = hashPwd(user.rows[0].salt, password);

        const isMatch = user.rows[0].senha === passHash;

        if (!isMatch) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Dados incorretos!' }] });
          }

          if(isMatch) console.log('everything is fine!');

        const payload = {
            user: {
                id: user.rows[0].user_id
            }
        }

          jwt.sign(
            payload,
            'd7weq5ewq',
            { expiresIn: '1hr' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//create a user
app.post('/users', async (req, res) => {
    try {
        const { nome, sobrenome, username, senha } = req.body;
        var salt = crypto.randomBytes(32).toString('hex');
        const passwordHashed = hashPwd(salt, senha);

        const newUser = await pool.query("INSERT INTO usert (nome, sobrenome, username, senha, salt) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [nome, sobrenome, username, passwordHashed, salt]);

        return res.json(newUser.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//get all users
app.get('/users', async(req, res) => {
    try {
        const users = await pool.query('SELECT * FROM usert');
        return res.json(users.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//get a user
app.get('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM usert WHERE user_id = $1', [id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//update a user
app.put('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, username } = req.body;
        await pool.query('UPDATE usert SET nome = $1, sobrenome = $2, username = $3 WHERE user_id = $4',
        [nome, sobrenome, username, id]);

        return res.json('User was updated!');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//delete a user
app.delete('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM usert WHERE user_id = $1", 
        [id]);
        return res.json('User was deleted!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});