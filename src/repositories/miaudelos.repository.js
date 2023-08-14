import { db } from "../database.js";

export function getAllMiaudelos() {
    return db.query(`SELECT * FROM miaudelos;`)
}

export function getMiaudelosByUserIdAndMiaudelosName(userId, name) {
    return db.query(`
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
}

export function getRaceIdByRaceName(race) {
    return db.query(`
    SELECT
        id
    FROM
        races
    WHERE
        race=$1`,
        [race])
}

export function createMiaudelo(userId, name, raceConsulta, age, personality, weight, vacancy) {
    return db.query(`
    INSERT INTO 
        miaudelos (name,"raceId", age,personality,weight,vacancy, "userId") 
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7)`,
        [name, raceConsulta.rows[0].id, age, personality, weight, vacancy, userId])
}

export function createPhotos(photos) {
    let query = ('INSERT INTO photos (photo) VALUES ##valores##')

    let valores = ""

    for (let i = 1; i <= photos.length; i++) {
        valores += ` ($${i}), `;
    }

    let queryAtualizada = query.replace("##valores##", valores.trim().slice(0, -1));

    return db.query(queryAtualizada, photos)
}

export function getMiaudeloAndRaceNameByMiaudeloId(id) {
    return db.query(`
    SELECT 
        miaudelos.*, races.race
    FROM 
        miaudelos
    JOIN 
        races ON races.id = miaudelos."raceId"
    WHERE 
        miaudelos.id=$1
    ;
    `, [id])
}

export function getMiaudeloById(id) {
    return db.query(`
    SELECT 
         * 
    FROM 
        miaudelos 
    WHERE 
        id=$1
    ;
`, [id])
}

export function upadateMiaudelo(id, name, race, age, personality, weight) {
    return db.query(`
    UPDATE miaudelos 
    SET 
        name=$2,
        "raceId"=$3,
        age=$4,
        personality=$5,
        weight=$6
    WHERE 
        miaudelos.id=$1
        `, [id, name, race, age, personality, weight])
}

export function updateVacancyMiaudelo(id, vacancy) {
    return db.query(`
    UPDATE miaudelos SET vacancy=$2 WHERE id=$1;`, [id, vacancy])
}
