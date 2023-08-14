import { db } from "../database.js"

export function getUserByEmailDb(email) {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
}

export function createUserDb(name, email, hash, phone, cpf) {
    return db.query(`
            INSERT INTO users (name, email, password, phone, cpf)
            VALUES ($1, $2, $3, $4, $5);
    `, [name, email, hash, phone, cpf])
}