import { db } from "../database.js";

export function createSessionDb(userId, token) {
    return db.query(`
    INSERT INTO sessions ("userId", "token" ) VALUES ($1, $2)
`, [userId, token]);
}
