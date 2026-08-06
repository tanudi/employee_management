import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Error from "./Error"

describe("Error", () => {
    it("renders the error message", () => {
        render(<Error />)

        expect(screen.getByText("Something is wrong")).toBeInTheDocument()
    })
})
