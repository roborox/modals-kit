import { useContext, useCallback } from "react"
import { modalRegisterContext } from "./context"

export function useModal(id: string) {
	const context = useContext(modalRegisterContext)

	if (!context) {
		throw new Error("Modal context is not found")
	}

	return useCallback((isVisible: boolean) => {
		context.toggle(id, isVisible)
	}, [context, id])
}