import React from "react"
import Svg, { Path } from "react-native-svg"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

export type CloseButtonProps = TouchableOpacityProps & {
	svgProps: any
	iconColor?: string
	iconSize?: number
	size?: number
}


export function CloseButton({
	style, svgProps, size, iconSize = 18, iconColor = "rgba(255, 255, 255, 0.6)", ...restProps
}: CloseButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[styles.root, {
				width: size,
				height: size,
				borderRadius: size,
			}, style]}
			{...restProps}
		>
			<Svg width={iconSize} height={iconSize} viewBox="0 0 14 14" fill="none" {...restProps}>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.364 0.636033C12.9734 0.245508 12.3403 0.245509 11.9497 0.636033L6.99999 5.58578L2.05025 0.636033C1.65972 0.245509 1.02656 0.245508 0.636033 0.636033C0.245509 1.02656 0.245509 1.65972 0.636033 2.05025L5.58578 6.99999L0.636033 11.9497C0.245509 12.3403 0.245509 12.9734 0.636033 13.364C1.02656 13.7545 1.65972 13.7545 2.05025 13.364L6.99999 8.41421L11.9497 13.364C12.3403 13.7545 12.9734 13.7545 13.364 13.364C13.7545 12.9734 13.7545 12.3403 13.364 11.9497L8.41421 6.99999L13.364 2.05025C13.7545 1.65972 13.7545 1.02656 13.364 0.636033Z"
					fill={iconColor}
				/>
			</Svg>
		</TouchableOpacity>
	)
}
