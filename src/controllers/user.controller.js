import { db } from "../database.js"

export async function getMiaudelos(req, res) {
    try {
        const miaudelos = await db.query(`SELECT * FROM miaudelos;`)
        res.send(miaudelos.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postMiaudelos(req, res) {
    const { name, photos, race, age, personality, weight, vacancy } = req.body
    const { userId } = res.locals

    try {
        const miaudelos = await db.query(`
            SELECT 
                miaudelos.name, miaudelos."userId", users.id
            FROM
                miaudelos
            JOIN 
                users 
            ON 
                miaudelos."userId" = users.id
            WHERE 
                "userId"=$1 AND miaudelos.name=$2;    
        `, [userId, name])
        if (miaudelos.rowCount > 0) {
            res.status(409).send('Este miaudelo já está cadastrado!')
        }
        const raceConsulta = await db.query(`
            SELECT
                id
            FROM
                races
            WHERE
                race=$1`,
            [race])

        if (raceConsulta.rowCount <= 0) {
            res.sendStatus(404)
        }

        await db.query(`
            INSERT INTO 
                miaudelos (name,"raceId", age,personality,weight,vacancy) 
            VALUES 
                ($1, $2, $3, $4, $5, $6)`,
            [name, raceConsulta.rows[0].id, age, personality, weight, vacancy])

        let query = ('INSERT INTO photos (photo) VALUES ##valores##')

        let valores = ""

        for (let i = 1; i <= photos.length; i++) {
            valores += ` ($${i}), `;
        }

        let queryAtualizada = query.replace("##valores##", valores.trim().slice(0, -1));

        await db.query(queryAtualizada, photos)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getMiaudelosById(req, res) {
    const { id } = req.params
    try {
        await db.query(`
            SELECT 
                * 
            FROM 
                miaudelos 
            JOIN 
                races ON races.id = miaudelos."raceId"
              
            WHERE 
                id=$1
            ;
            `, [id])
    } catch (err) {
        res.status(500).send(err.message)
    }

    res.send("getMiaudelosById")
}

export async function putMiaudelo(req, res) {
    res.send("getUsersById")
}