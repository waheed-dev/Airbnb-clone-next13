'use client'
import axios from 'axios'
import {FieldValues,SubmitHandler,useForm} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useState} from "react";
import {log} from "util";
import Modal from "@/app/components/modals/modal";
import Heading from "@/app/Heading";
const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
      handleSubmit,
      formState : {
      errors
      }
  } = useForm<FieldValues>({
    defaultValues : {
      name : '',
      email : '',
      password : ''
    }
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/register',data).then(() => {
      registerModal.onClose()
    }).catch((err) => console.log(err)).finally(() => {
      setIsLoading(false)
    })
  }
  const bodyContent = (
      <div className={'flex flex-col gap-4'}>
        <Heading title={'welcome to Airbnb'} subtitle={'create an account'} />
        <input/>
      </div>
  )

  return (
      <Modal disabled={isLoading} isOpen={registerModal.isOpen} title={'Register'} actionLabel={'Continue'}
      onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
      />
  )
}
export default RegisterModal