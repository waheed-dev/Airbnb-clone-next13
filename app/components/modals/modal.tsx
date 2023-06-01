'use client'
import React, {useCallback, useEffect, useState} from "react";
import {IoMdClose} from "react-icons/io";
import Button from "@/app/components/Button";

interface ModalProps {
    isOpen?: boolean
    onSubmit: () => {}
    onClose: () =>void
    title? : string
    body? : React.ReactElement
    footer? : React.ReactElement
    disabled? : boolean
    actionLabel : string
    secondaryAction? : () => void
    secondaryActionLabel?: string
}
const Modal : React.FC<ModalProps> = ({actionLabel,secondaryAction,secondaryActionLabel,onSubmit,disabled,footer,isOpen,title,onClose,body}) => {
    const [showModal,setShowModal] = useState(isOpen)
    useEffect(() => {
        setShowModal(isOpen)
    },[isOpen])
    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        setShowModal(false)
        setTimeout(() => {
            onClose()
        },300)
    },[disabled,onClose])
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }
        onSubmit()
    },[disabled,onSubmit])

    const handleSecondaryAction = useCallback(() =>{
    if (disabled || !secondaryAction) {
        return
    }
    secondaryAction()
    },[disabled,secondaryAction])

    if (!isOpen) {
        return null
    }

    return (
      <>
       <div className={'justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-600/70'}>
        <div className={'relative w-full md:w-4/6 l:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'}>
        <div className={`translate duration-300 h-full ${showModal ? 'translate-y-8' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className={'translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'}>
                <div className={'flex items-center p-6 rounded-t justify-center relative border-b-[1px]'}>
                    <button className={'p-1 border-0 hover:opacity-70 transition absolute left-9 '}>
                        <IoMdClose size={18} onClick={handleClose}/>
                    </button>
                    <div className={'text-lg font-semibold'}>
                        {title}
                    </div>
                </div>
                <div className={'relative p-6 flex-auto'}>
                    {body}
                </div>
                <div className={'flex flex-col gap-2 p-6'}>
                    <div className={'flex flex-row items-center gap-4 w-full'}>

                        {
                            secondaryAction && secondaryActionLabel && (
                                <Button label={secondaryActionLabel ?? ''} outline onClick={handleSecondaryAction} disabled={disabled}
                                />
                            )
                        }

                        <Button label={actionLabel} onClick={handleSubmit} disabled={disabled}
                        />
                    </div>
                    {footer}
                </div>
            </div>
        </div>
        </div>
       </div>
      </>
  )
}

export default Modal