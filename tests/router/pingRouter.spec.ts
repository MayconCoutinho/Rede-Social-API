import request from "supertest"
import { expect, describe, it } from "vitest"
import { app } from "../../src"

// Teste com a plicação funcionando por completo e dando retorno (Teste de integração)

describe("GET /ping", () => {
	it("should get the ping", async () => {
		const response = await request(app).get("/ping")
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("message")
		expect(response.body.message).toEqual("Pong!")
	})
})
