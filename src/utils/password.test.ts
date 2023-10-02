import { hash } from "./password";
import { describe, expect, it } from "vitest";

describe("Test Password Util Functions", () => {
    it("Check whether the password '123' returns the correct result.", () => {
        expect(hash("123")).toBe("a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
    })

    it("Check whether the password 'Password@123' returns the correct result.", () => {
        expect(hash("Password@123")).toBe("ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f");
    })
})