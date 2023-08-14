import { db } from "../database.js";

export function getSessionByToken(token) {
    return db.query(`SELECT * FROM sessions WHERE token=$1;`, [`${token}`])
}