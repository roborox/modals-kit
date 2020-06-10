import * as RNModal from "react-native-modal"

export namespace ModalRegister {
	export type ModalState = Omit<RNModal.ModalProps, "children">

	export type ContextValue = {
		toggle: (id: string, isVisible: boolean) => void
		register: (id: string, isVisible?: boolean) => void
		destroy: (id: string) => void
		getState: (id: string) => boolean
	}

	export type Logger = {
		warn: (...args: any[]) => void
		error: (...args: any[]) => void
		info: (...args: any[]) => void
	}
}