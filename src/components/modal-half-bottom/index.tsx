import React, { useMemo } from "react"
import deepmerge from "deepmerge"
import { withSafeArea } from "react-native-safe-area"
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
	heightRatio?: number
}

const BottomSafeArea = withSafeArea(View, "padding", "bottom")

export function ModalHalfBottom({ heightRatio = 0.5, styles = {}, children, ...restProps }: ModalHalfBottomProps) {
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
				style={[combinedStyles.root, {
					maxHeight: height * heightRatio,
				}]}
			>
				<CloseButton onPress={() => toggle(false)} style={combinedStyles.closeButton} />
				<BottomSafeArea style={combinedStyles.content}>
					{children}
				</BottomSafeArea>
			</View>
		</Modal>
	)
}