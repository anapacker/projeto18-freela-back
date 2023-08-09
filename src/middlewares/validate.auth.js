import { db } from "../database.js"

export async function validateAuth(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '').trim()
    if (!token) return res.sendStatus(401)

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [`${token}`])

        if (!session.rowCount) return res.sendStatus(401)

        res.locals.userId = session.rows[0].userId
    } catch (err) {
        res.status(500).send(err.message)
    }
    next()
}