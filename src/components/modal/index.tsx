import React from "react"
import RNModal from "react-native-modal"
import { ModalRegister } from "../../modal-register"
import { useModalRegister } from "../../modal-register/use-modal-register"

export type ModalProps = Partial<ModalRegister.ModalState> & {
	id: string
	children: React.ReactNode
}

export function Modal({ id, ...restProps }: ModalProps) {
	const isVisible = useModalRegister(id)

	return <RNModal isVisible={isVisible} {...restProps} />
}
