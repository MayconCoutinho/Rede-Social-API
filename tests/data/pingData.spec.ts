import request from "supertest"
import { expect, describe, it } from "vitest"
import { app } from "../../src"

describe("GET /ping", () => {
	it("should get the ping", async () => {
		const response = await request(app).get("/ping")
		expect(response.body.message).toEqual("Pong!")
	})
	it("should post database of user", async () => {
		const response: any = await request(app).post("/user/create").send({
			user: "Maycon",
			email: "mayconteste@gmail.com",
			passaword: "123456",
		})
		// expect(response).toBe(201)
		// expect(response.body).toHaveProperty("user")
	})
})
