import { useContext, useEffect, useMemo } from "react"
import { modalRegisterContext } from "./context"

export function useModalRegister(id: string) {
	const context = useContext(modalRegisterContext)
	if (!context) {
		throw new Error("Modal context is not found")
	}

	const { register, destroy, getState } = context
	useEffect(() => {
		register(id)
		return () => destroy(id)
	}, [destroy, id, register])

	return useMemo(() => getState(id), [getState, id])
}
