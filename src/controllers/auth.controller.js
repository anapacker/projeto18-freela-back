import bcrypt from "bcrypt"
import { v4 } from "uuid"
import { createUserDb, getUserByEmailDb } from "../repositories/user.repositories.js";
import { createSessionDb } from "../repositories/auth.repository.js";

export async function signup(req, res) {
    const { name, email, password, phone, cpf } = req.body

    try {
        const user = await getUserByEmailDb(email)
        if (user.rowCount > 0) return res.status(409).send("E-mail já cadastrado.")

        const hash = bcrypt.hashSync(password, 10)
        await createUserDb(name, email, hash, phone, cpf)

        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function signin(req, res) {
    const { email, password } = req.body

    try {
        const login = await getUserByEmailDb(email)
        if (!login.rowCount) return res.status(404).send("Você não tem cadastro.")
        if (!bcrypt.compareSync(password, login.rows[0].password)) return res.status(401).send("Senha incorreta.")
        const token = v4();

        const insertSessionLogin = await createSessionDb(login.rows[0].id, token)

        if (!insertSessionLogin.rowCount) {
            return res.sendStatus(444);
        }

        return res.status(200).send({ id: login.rows[0].id, token: token })
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
