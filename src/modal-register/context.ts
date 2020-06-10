import React from "react"
import { ModalRegister } from "./types"

export const modalRegisterContext = React.createContext<null | ModalRegister.ContextValue>(null)