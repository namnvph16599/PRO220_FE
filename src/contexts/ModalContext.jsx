
// import React, { useState } from "react"
// import BaseModal from "../components/BaseModal"
// export const ModalContext = React.createContext()

// const initialBaseModalState = {
//   content:<></>,
//   width:540
// }

// export const ModalProvider = ({children})=>{
//   const [openBaseModal,setOpenBaseModal] = useState(false)
//   const [baseModalState,setBaseModalState] = useState(initialBaseModalState)

//   const showModal = (config)=>{
//     setBaseModalState({...baseModalState,...config,onCancel:()=>setOpenBaseModal(false)})
//     setOpenBaseModal(true)
//   }

//   const closeModal = ()=>{
//     setOpenBaseModal(false)
//   }

//   return (
//     <ModalContext.Provider 
//       value={{
//         showModal,
//         closeModal
//       }}>
//       {children}
//       <BaseModal
//         propsApi={baseModalState}
//         open={openBaseModal}
//       >
//         {baseModalState.content}
//       </BaseModal>
//     </ModalContext.Provider>
//   )
// }


