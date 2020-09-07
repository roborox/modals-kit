import React, { useMemo } from "react"
import { PropsWithChildren, useCallback, useState } from "react"
import { modalRegisterContext } from "./context"
import { ModalRegister } from "./types"

export type ModalRegisterProviderProps = {
	logger: ModalRegister.Logger
	defaultState?: Partial<ModalRegister.ModalState>
}

export function ModalRegisterProvider({
	children,
	logger,
	defaultState = {},
}: PropsWithChildren<ModalRegisterProviderProps>) {
	const [map, setMap] = useState(() => new Map<string, boolean>())

	const update = useCallback((id: string, next: boolean) => {
		setMap(prev => new Map(prev.set(id, next)))
	}, [])

	const destroy = useCallback((id: string) => {
		setMap(prev => {
			prev.delete(id)
			return new Map(prev)
		})
	}, [])

	const register = useCallback(
		(id: string, isVisible = false) => {
			update(id, isVisible)
		},
		[update]
	)

	const toggle = useCallback(
		(id: string, isVisible: boolean) => {
			update(id, isVisible)
		},
		[update]
	)

	const getState = useCallback((id: string) => Boolean(map.get(id)), [map])

	const value = useMemo(() => {
		return {
			toggle,
			destroy,
			register,
			getState,
		}
	}, [toggle, destroy, register, getState])

	return <modalRegisterContext.Provider value={value}>{children}</modalRegisterContext.Provider>
}
