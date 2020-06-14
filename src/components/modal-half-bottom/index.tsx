import React, { useMemo } from "react"
import deepmerge from "deepmerge"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, ViewStyle, useWindowDimensions } from "react-native"
import { ModalProps, Modal } from "../modal"
import { CloseButton } from "../close-button"
import { useModal } from "../../modal-register"

export type ModalHalfBottomStyles = {
	root: ViewStyle
	closeButton: ViewStyle
	modal: ViewStyle
	content: ViewStyle
}

const modalHalfBottomStyles: StyleSheet.NamedStyles<ModalHalfBottomStyles> = {
	root: {
		flex: 1,
		position: "relative",
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingVertical: 32,
		paddingHorizontal: 20,
	},
	content: {
		flex: 1,
	},
	closeButton: {
		position: "absolute",
		right: 20,
		top: -50,
	},
	modal: {
		margin: 0,
		justifyContent: "flex-end",
	},
}

export type ModalHalfBottomProps = ModalProps & {
	styles?: Partial<ModalHalfBottomStyles>
	maxHeight?: number
}

export function ModalHalfBottom({ maxHeight, styles = {}, children, ...restProps }: ModalHalfBottomProps) {
	const { height } = useWindowDimensions()
	const combinedStyles = useMemo(() => {
		return deepmerge(modalHalfBottomStyles, styles)
	}, [styles])
	const toggle = useModal(restProps.id)

	return (
		<Modal
			style={combinedStyles.modal}
			onSwipeComplete={() => toggle(false)}
			avoidKeyboard
			swipeDirection="down"
			{...restProps}
		>
			<View
				style={[{
					maxHeight: maxHeight ? maxHeight : height * 0.5,
				}, combinedStyles.root]}
			>
				<CloseButton onPress={() => toggle(false)} style={combinedStyles.closeButton} />
				<SafeAreaView edges={["bottom"]} style={combinedStyles.content}>
					{children}
				</SafeAreaView>
			</View>
		</Modal>
	)
}