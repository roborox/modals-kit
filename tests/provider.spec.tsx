import {ModalRegisterProvider} from "../src/modal-register/provider"
import {create, act}  from "react-test-renderer"
import React from "react"
import { modalRegisterContext } from "../src/modal-register/context"

const simpleLogger = {
	warn: (...args: any[]) => console.log("[WARN]", ...args),
	error: (...args: any[]) => console.log("[ERROR]", ...args),
	info: (...args: any[]) => console.log("[INFO]", ...args),
}

const GetState = ({id, idModal}: {id: string, idModal: string}) => <modalRegisterContext.Consumer>
	{data => <span id={id}>{data?.getState(idModal).toString()}</span>}
</modalRegisterContext.Consumer>

const RegisterButton = ({id, idButton}: {id: string, idButton: string}) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.register(id)} id={idButton}>Register</button>
		)}
	</modalRegisterContext.Consumer>
)

const ToggleButton = ({id, isVisible, idButton}: {id: string, idButton: string, isVisible: boolean}) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.toggle(id, isVisible)} id={idButton}>Toggle</button>
		)}
	</modalRegisterContext.Consumer>
)

const DestroyButton = ({id, idButton}: {id: string, idButton: string}) => (
	<modalRegisterContext.Consumer>
		{context => (
			<button onClick={() => context?.destroy(id)} id={idButton}>Destroy</button>
		)}
	</modalRegisterContext.Consumer>
)

test("Register and toggle(true)", () =>{
	let wrapper: any
	let instance: any
	let element = ({idState}: {idState: string}) =>(<ModalRegisterProvider logger={simpleLogger}>
		<GetState id={idState} idModal={"test"}/>
		<RegisterButton id={"test"} idButton={"register-button-1"}/>
		<ToggleButton id={"test"} isVisible={true} idButton={"toggle-button-1"}/>
	</ModalRegisterProvider>)
	act(() => {
		wrapper = create(element({idState: "1"}))
	})
	let tree=wrapper.toJSON()
	expect(tree[0].children).toEqual(["false"])
	expect(tree).toMatchSnapshot()
	instance = wrapper.root

	act(() => {
		const RegButton = instance.findByProps({id: "register-button-1"})
		RegButton.props.onClick()
		const TogButton=instance.findByProps({id: "toggle-button-1"})
		TogButton.props.onClick()
		wrapper.update(element({idState: "2"}))
	})

	tree=wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	instance=wrapper.root
	expect(tree[0].children).toEqual(["true"])
})

test("Register, toggle(true) and destroy", () =>{
	let wrapper: any
	let instance: any
	let element = ({idState}: {idState: string}) =>(<ModalRegisterProvider logger={simpleLogger}>
		<GetState id={idState} idModal={"test"}/>
		<RegisterButton id={"test"} idButton={"register-button-2"}/>
		<ToggleButton id={"test"} isVisible={true} idButton={"toggle-button-2"}/>
		<DestroyButton id={"test"} idButton={"destroy-button-2"}/>
	</ModalRegisterProvider>)

	act(() => {
		wrapper = create(element({idState: "3"}))
	})
	let tree=wrapper.toJSON()
	expect(tree[0].children).toEqual(["false"])
	expect(tree).toMatchSnapshot()
	instance = wrapper.root

	act(() => {
		const RegButton = instance.findByProps({id: "register-button-2"})
		RegButton.props.onClick()
		const TogButton=instance.findByProps({id: "toggle-button-2"})
		TogButton.props.onClick()
		wrapper.update(element({idState: "4"}))
	})

	tree=wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	instance=wrapper.root
	expect(tree[0].children).toEqual(["true"])

	act(() => {
		const DestButton = instance.findByProps({id: "destroy-button-2"})
		DestButton.props.onClick()
		wrapper.update(element({idState: "5"}))
	})
	tree=wrapper.toJSON()
	expect(tree).toMatchSnapshot()
	expect(tree[0].children).toEqual(["false"])

})