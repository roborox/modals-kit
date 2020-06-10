import React, { useEffect } from "react"
import RNModal from "react-native-modal"
import { useModal, ModalRegister } from "../../modal-register"

export type ModalProps = Partial<ModalRegister.ModalState> & {
	id: string
	children: React.ReactNode
}

export function Modal({ id, ...restProps }: ModalProps) {
	const modal = useModal(id, restProps)

	useEffect(() => {
		modal.registerModal(restProps)

		return modal.unregisterModal
	}, [modal, modal.registerModal, restProps])

	return (
		<RNModal {...modal.getState()} {...restProps} />
	)
}