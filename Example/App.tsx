import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text, Button } from "react-native";
import { Modal, ModalRegisterProvider, useModal } from "../src"

declare const global: {HermesInternal: null | {}};

const simpleLogger = {
	warn: (...args: any[]) => console.log("[WARN]", ...args),
	error: (...args: any[]) => console.log("[ERROR]", ...args),
	info: (...args: any[]) => console.log("[INFO]", ...args),
}

const customModalId = "my-modal"

const MyCustomModal = () => {
	const toggle = useModal(customModalId)
	const [backgroundColor, setBackgroundColor] = useState("red")
	return (
		<Modal backdropColor={backgroundColor} id={customModalId}>
			<View style={{ flex: 1,  alignItems: "center", justifyContent: "center" }}>
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
	const toggle = useModal(customModalId)
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<MyCustomModal />
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text onPress={() => toggle(true)}>
					Open modal
				</Text>
			</View>
		</SafeAreaView>
	)
}

const Root = () => {
	return (
		<ModalRegisterProvider logger={simpleLogger}>
			<StatusBar barStyle="dark-content" />
			<App />
		</ModalRegisterProvider>
	);
};

export default Root;
