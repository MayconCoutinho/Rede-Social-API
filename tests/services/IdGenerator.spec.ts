import { expect, describe, it } from "vitest"
import { IdGenerator } from "../../src/services/IdGenerator"

describe("generateUUID v4", () => {
	it("should return a string with length 36 and correct format", () => {
		const response = new IdGenerator().generate()
		expect(response).toHaveLength(36)
		expect(response).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
	})
	it("should generate different UUIDs consistently", () => {
		const uuids: string[] = []
		for (let i = 0; i < 100; i++) {
			const response = new IdGenerator().generate()

			uuids.push(response)
		}
		expect(uuids).toHaveLength(new Set(uuids).size)
	})
})
