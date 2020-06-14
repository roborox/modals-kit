import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text, Button } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Modal, ModalRegisterProvider, useModal, ModalHalfBottom } from "../src"

declare const global: {HermesInternal: null | {}};

const simpleLogger = {
	warn: (...args: any[]) => console.log("[WARN]", ...args),
	error: (...args: any[]) => console.log("[ERROR]", ...args),
	info: (...args: any[]) => console.log("[INFO]", ...args),
}

const HalfScreenModal = () => {
	const toggle = useModal("half-screen")
	return (
		<ModalHalfBottom maxHeight={200} id="half-screen">
			<View style={{flex: 1, backgroundColor: "red"}}>
				<Button title="Hide modal" onPress={() => toggle(false)} />
			</View>
		</ModalHalfBottom>
	)
}

const SimpleModal = () => {
	const toggle = useModal("simple")
	const [backgroundColor, setBackgroundColor] = useState("red")
	return (
		<Modal backdropColor={backgroundColor} id="simple">
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Button title="Hide modal" onPress={() => toggle(false)} />
				<Button 
					title="Change backdrop color" 
					onPress={() => setBackgroundColor(prev => prev === "red" ? "black" : "red")} 
				/>
			</View>
		</Modal>
	)
}

const App = () => {
	const toggle1 = useModal("simple")
	const toggle2 = useModal("half-screen")
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SimpleModal />
			<HalfScreenModal />
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text onPress={() => toggle1(true)}>
					Open basic modal
				</Text>
				<Text onPress={() => toggle2(true)}>
					Open half screen modal
				</Text>
			</View>
		</SafeAreaView>
	)
}

const Root = () => {
	return (
		<SafeAreaProvider>
			<ModalRegisterProvider logger={simpleLogger}>
				<StatusBar barStyle="dark-content" />
				<App />
			</ModalRegisterProvider>
		</SafeAreaProvider>
	);
};

export default Root;
