import React from "react"
import { PropsWithChildren, useCallback, useState } from "react"
import { modalRegisterContext } from "./context"
import { ModalRegister } from "./types"

export type ModalRegisterProviderProps = {
	logger: ModalRegister.Logger
	defaultState?: Partial<ModalRegister.ModalState>
}

export function ModalRegisterProvider({
	children, logger, defaultState = {},
}: PropsWithChildren<ModalRegisterProviderProps>) {
	const [register, setRegister] = useState(() => new Map<string, ModalRegister.ModalState>())

	const setItem = useCallback((id: string, next: ModalRegister.ModalState) => {
		setRegister(new Map(register.set(id, next)))
	}, [register, setRegister])

	const updateModal = useCallback((
		id: string, next: (prev: ModalRegister.ModalState) => ModalRegister.ModalState,
	) => {
		const previous = register.get(id)
		if (!previous) {
			logger.warn("Trying to update modal props that doesn't registered", id)
		} else {
			setItem(id, next(previous))
		}
	}, [register, logger, setItem])

	const registerModal = useCallback((id: string, initial: Partial<ModalRegister.ModalState> = {}) => {
		const state = register.get(id)
		if (!state) {
			setItem(id, {
				isVisible: false,
				...defaultState,
				...initial,
			} as ModalRegister.ModalState)
		}
	}, [setItem, defaultState, register])

	const unregisterModal = useCallback((id) => {
		register.delete(id)
	}, [register])

	const toggleModal = useCallback((id: string, isVisible: boolean) => {
		updateModal(id, prev => ({ ...prev, isVisible }))
	}, [updateModal])

	const getState = useCallback((id: string) => {
		const state = register.get(id)
		return state
	}, [register])

	return (
		<modalRegisterContext.Provider
			value={{
				toggleModal,
				registerModal,
				updateModal,
				getState,
				unregisterModal,
			}}
		>
			{children}
		</modalRegisterContext.Provider>
	)
}