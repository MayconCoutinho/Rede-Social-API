import { expect, describe, it } from "vitest"
import { CheckingUserData } from "../../src/services/CheckingUserData"
import { ParamsError } from "../../src/errors/ParamsError"
import { PrismaClient } from "@prisma/client"
import { HashManager } from "../../src/services/HashManager"

describe("Check that all functions that use email are working", () => {
	const emailExist = "certo@gmail.com"
	const notEmailExist = "NotExistEmail@gmail.com"
	const returnBoolean = "certo@gmail.com"

	it("should check if email exists in the database", async () => {
		const checking = new CheckingUserData()
		await checking.CheckinEmail(returnBoolean)
		const result = await checking.CheckiIsEmailAlreadyExists(returnBoolean)

		expect(typeof result).toBe("boolean")
	})
	it("should check if email exists in the database and return True", async () => {
		const checking = new CheckingUserData()
		await checking.CheckinEmail(emailExist)
		const result = await checking.CheckiIsEmailAlreadyExists(emailExist)

		expect(result).toBe(true)
	})
	it("should check if email exists in the database and return False", async () => {
		const checking = new CheckingUserData()
		await checking.CheckinEmail(notEmailExist)
		const result = await checking.CheckiIsEmailAlreadyExists(notEmailExist)
		expect(result).toBe(false)
	})
})
describe("Check that all functions that use password are working", () => {
	const passwordExist = "123456"
	it("should check if password exists in the database", async () => {
		const checking = new CheckingUserData()
		await checking.CheckiPassword(passwordExist)
		const result = await checking.CheckiPassword(passwordExist)

		expect(typeof result).toBe("boolean")
	})
})

describe("Check login is true", () => {
	const email = "teste270@gmail.com"
	const password = "123456"
	const emailError = "teste270ERROR@gmail.com"
	const passwordError = "123456ERROR"
	it("should check if password exists in the database", async () => {
		const checking = new CheckingUserData()
		const result = await checking.CheckiIsEmailAlreadyExists(email)

		const prisma = new PrismaClient()
		const decrypt = new HashManager()

		const resultData = await prisma.userPublic.findFirst({
			where: { email },
		})

		const passwordHash = resultData?.password

		if (passwordHash) {
			const decryptResult = await decrypt.compare(password, passwordHash)

			if (decryptResult) {
				return result
			}
			return false
		}

		// expect(typeof result).toBe("boolean")
	})

	it("should check if password exists in the database and return object", async () => {
		const checking = new CheckingUserData()

		const result = await checking.CheckingLogin(email, password)

		expect(typeof result).toBe("string")
	})
	it("should check if password not exists in the database and return False", async () => {
		const checking = new CheckingUserData()

		const result = await checking.CheckingLogin(email, passwordError)

		expect(result).toBe(false)
	})
})
