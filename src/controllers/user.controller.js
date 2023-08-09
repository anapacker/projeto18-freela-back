import { db } from "../database.js"
import bcrypt from "bcrypt"
import { v4 } from "uuid"

export async function signup(req, res) {
    const { name, email, password } = req.body
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email])
        if (user.rowCount > 0) return res.status(409).send("E-mail já cadastrado.")
        const hashPassword = await bcrypt.hash(password, 10)

        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
            `, [name, email, hashPassword])
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function signin(req, res) {
    const { email, password } = req.body

    try {
        const login = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        if (!login.rowCount) return res.status(404).send("Você não tem cadastro.")
        if (!bcrypt.compareSync(password, login.rows[0].password)) return res.status(401).send("Senha incorreta.")
        const token = v4();

        const insertSessionLogin = await db.query(`
            INSERT INTO sessions ("userId", "token" ) VALUES ($1, $2)
        `, [`${login.rows[0].id}`, `${token}`]);

        // const sessions = await db.query(`SELECT * FROM sessions;`)
        // console.log(sessions.rows);
        if (!insertSessionLogin.rowCount) {
            return res.sendStatus(444);
        }

        return res.status(200).send({ id: login.rows[0].id, token: token })

    } catch (err) {
        return res.status(500).send(err.message)
    }
}
