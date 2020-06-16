import { useContext, useCallback } from "react"
import { modalRegisterContext } from "./context"

export function useModal(id: string) {
	const { toggle } = useContext(modalRegisterContext) || {}

	if (!toggle) {
		throw new Error("Modal context is not found")
	}

	return useCallback((isVisible: boolean) => {
		toggle(id, isVisible)
	}, [toggle, id])
}