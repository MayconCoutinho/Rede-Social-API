import request from "supertest"
import { expect, describe, it } from "vitest"
import { app } from "../../src"

// Teste com a plicação funcionando por completo e dando retorno (Teste de integração)

describe("GET /posts", () => {
	it.skip("should get all user posts", async () => {
		const response = await request(app).get("/posts")
		// expect(response.status).toBe(200)
	})
})
