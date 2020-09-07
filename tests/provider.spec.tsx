import { ModalRegisterProvider } from "../src/modal-register/provider"
import { create, act } from "react-test-renderer"
import React from "react"
import { modalRegisterContext } from "../src/modal-register/context"

const REGISTER_BUTTON_ID_1 = "register-button-1"
const TOGGLE_BUTTON_ID_1 = "toggle-button-1"
const REGISTER_BUTTON_ID_2 = "register-button-2"
const TOGGLE_BUTTON_ID_2 = "toggle-button-2"
const DESTROY_BURRON_ID_2 = "destroy-button-2"
const MODAL_ID = "test"

const simpleLogger = {
	warn: (...args: any[]) => console.log("[WARN]", ...args),
	error: (...args: any[]) => console.log("[ERROR]", ...args),
	info: (...args: any[]) => console.log("[INFO]", ...args),
}

const GetState = ({ id, idModal }: { id: string; idModal: string }) => (
	<modalRegisterContext.Consumer>
		{data => <span id={id}>{data?.getState(idModal).toString()}</span>}
	</modalRegisterContext.Consumer>
)

const RegisterButton = ({ id, idButton }: { id: string; idButton: string }) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.register(id)} id={idButton}>
				Register
			</button>
		)}
	</modalRegisterContext.Consumer>
)

const ToggleButton = ({ id, isVisible, idButton }: { id: string; idButton: string; isVisible: boolean }) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.toggle(id, isVisible)} id={idButton}>
				Toggle
			</button>
		)}
	</modalRegisterContext.Consumer>
)

const DestroyButton = ({ id, idButton }: { id: string; idButton: string }) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.destroy(id)} id={idButton}>
				Destroy
			</button>
		)}
	</modalRegisterContext.Consumer>
)

test("Register and toggle(true)", () => {
	let wrapper: any
	let instance: any
	let element = ({ idState }: { idState: string }) => (
		<ModalRegisterProvider logger={simpleLogger}>
			<GetState id={idState} idModal={MODAL_ID} />
			<RegisterButton id={MODAL_ID} idButton={REGISTER_BUTTON_ID_1} />
			<ToggleButton id={MODAL_ID} isVisible={true} idButton={TOGGLE_BUTTON_ID_1} />
		</ModalRegisterProvider>
	)
	act(() => {
		wrapper = create(element({ idState: "1" }))
	})
	let tree = wrapper.toJSON()
	expect(tree[0].children).toEqual(["false"])
	expect(tree).toMatchSnapshot()
	instance = wrapper.root

	act(() => {
		const RegButton = instance.findByProps({ id: REGISTER_BUTTON_ID_1 })
		RegButton.props.onClick()
		const TogButton = instance.findByProps({ id: TOGGLE_BUTTON_ID_1 })
		TogButton.props.onClick()
		wrapper.update(element({ idState: "2" }))
	})

	tree = wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	instance = wrapper.root
	expect(tree[0].children).toEqual(["true"])
})

test("Register, toggle(true) and destroy", () => {
	let wrapper: any
	let instance: any
	let element = ({ idState }: { idState: string }) => (
		<ModalRegisterProvider logger={simpleLogger}>
			<GetState id={idState} idModal={MODAL_ID} />
			<RegisterButton id={MODAL_ID} idButton={REGISTER_BUTTON_ID_2} />
			<ToggleButton id={MODAL_ID} isVisible={true} idButton={TOGGLE_BUTTON_ID_2} />
			<DestroyButton id={MODAL_ID} idButton={DESTROY_BURRON_ID_2} />
		</ModalRegisterProvider>
	)

	act(() => {
		wrapper = create(element({ idState: "3" }))
	})
	let tree = wrapper.toJSON()
	expect(tree[0].children).toEqual(["false"])
	expect(tree).toMatchSnapshot()
	instance = wrapper.root

	act(() => {
		const RegButton = instance.findByProps({ id: REGISTER_BUTTON_ID_2 })
		RegButton.props.onClick()
		const TogButton = instance.findByProps({ id: TOGGLE_BUTTON_ID_2 })
		TogButton.props.onClick()
		wrapper.update(element({ idState: "4" }))
	})

	tree = wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	instance = wrapper.root
	expect(tree[0].children).toEqual(["true"])

	act(() => {
		const DestButton = instance.findByProps({ id: DESTROY_BURRON_ID_2 })
		DestButton.props.onClick()
		wrapper.update(element({ idState: "5" }))
	})
	tree = wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	expect(tree[0].children).toEqual(["false"])
})
