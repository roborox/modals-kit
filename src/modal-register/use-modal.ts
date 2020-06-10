import { useContext } from "react"
import { modalRegisterContext } from "./context"
import { ModalRegister } from "./types"

export function useModal(id: string, initial: Partial<ModalRegister.ModalState> = {}) {
	const context = useContext(modalRegisterContext)

	if (!context) {
		throw new Error("Modal context is not found")
	}

	return {
		getState: () => context.getState(id),
		toggleModal: (isVisible: boolean) => context.toggleModal(id, isVisible),
		updateModal: (
			next: (prev: ModalRegister.ModalState) => ModalRegister.ModalState,
		) => context.updateModal(id, next),
		registerModal: (initial: Partial<ModalRegister.ModalState> = {}) => context.registerModal(id, initial),
		unregisterModal: () => context.unregisterModal(id),
	}
}