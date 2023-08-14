import { db } from "../database.js"
import * as repository from "../repositories/miaudelos.repository.js"

export async function getMiaudelos(req, res) {
    try {
        const miaudelos = await repository.getAllMiaudelos()
        res.send(miaudelos.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postMiaudelos(req, res) {
    const { name, photos, race, age, personality, weight, vacancy } = req.body
    const { userId } = res.locals

    try {
        const miaudelos = await repository.getMiaudelosByUserIdAndMiaudelosName(userId, name)
        if (miaudelos.rowCount > 0) {
            return res.status(409).send('Este miaudelo já está cadastrado!')
        }
        const raceConsulta = await repository.getRaceIdByRaceName(race)

        if (raceConsulta.rowCount <= 0) {
            return res.sendStatus(404)
        }

        await repository.createMiaudelo(userId, name, raceConsulta, age, personality, weight, vacancy)
        await repository.createPhotos(photos)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getMiaudelosById(req, res) {
    const { id } = req.params
    try {
        const result = await repository.getMiaudeloAndRaceNameByMiaudeloId(id)
        if (result.rows.length === 0) {
            return res.sendStatus(404)
        }
        res.send(result.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function putMiaudelo(req, res) {
    const { name, race, age, personality, weight, vacancy } = req.body
    const { id } = req.params
    const { userId } = res.locals

    try {
        const miaudeloExists = await repository.getMiaudeloById(id)
        if (miaudeloExists.rowCount === 0) return res.status(404).send("Miaudelo não encontrado.")
        if (miaudeloExists.rows[0].userId != userId) return res.status(403).send("Você não pode atualizar esse Miaudelo.")

        await repository.upadateMiaudelo(id, name, race, age, personality, weight)
        if (vacancy !== undefined) {
            await repository.updateVacancyMiaudelo(id, vacancy)
        }
        res.send("Miaudelo atualizado com sucesso!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}