import * as RNModal from "react-native-modal"

export namespace ModalRegister {
	export type ModalState = Omit<RNModal.ModalProps, "children">

	export type ContextValue = {
		toggleModal: (id: string, isVisible: boolean) => void
		registerModal: (id: string, initialProps: Partial<ModalState>) => void
		updateModal: (id: string, next: (prev: ModalState) => ModalState) => void
		getState: (id: string) => ModalState | undefined
	}

	export type Logger = {
		warn: (...args: any[]) => void
		error: (...args: any[]) => void
		info: (...args: any[]) => void
	}
}