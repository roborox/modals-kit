import { ViewStyle, StyleSheet } from "react-native"

export type CloseButtonStyles = {
	root: ViewStyle
}

export const styles: StyleSheet.NamedStyles<CloseButtonStyles> = {
	root: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		alignItems: "center",
		justifyContent: "center",
	},
}
