import { expect, describe, it } from "vitest"
import { RGBGenerator } from "../../src/services/RGBGenarator"

describe("Get random RGB", () => {
	it("should return a number between 0 and 255", () => {
		for (let i = 0; i < 30; i++) {
			const response = new RGBGenerator().generateRGB()[0]
			expect(response).toBeGreaterThanOrEqual(0)
			expect(response).toBeLessThanOrEqual(255)
		}
	})
})
