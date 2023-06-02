'use client'
import axios from 'axios'
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useState} from "react";
import Modal from "@/app/components/modals/modal";
import Heading from "@/app/Heading";
import Input from "@/app/components/inputs/input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data).then(() => {
            registerModal.onClose()
        }).catch((err) => toast.error('Something went wrong.')).finally(() => {
            setIsLoading(false)
        })
    }
    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading title={'welcome to Airbnb'} subtitle={'create an account'}/>
            <Input register={register} label={'Name'} id={'name'} disabled={isLoading} errors={errors} required/>
            <Input register={register} label={'Email'} id={'email'} disabled={isLoading} errors={errors} required/>
            <Input register={register} label={'Password'} id={'password'} type={'password'} disabled={isLoading}
                   errors={errors} required/>
        </div>
    )
    const footerContent = (
        <div className={'flex flex-col gap-4 mt-3'}>
            <hr/>
            <Button label={'Continue with Google'} onClick={() => {
            }} icon={FcGoogle} outline/>
            <Button label={'Continue with Github'} onClick={() => {
            }} icon={AiFillGithub} outline/>
            <div className={'text-neutral-500 text-center mt-4 font-light'}>
                <div className={'justify-center flex flex-row items-center gap-2'}>
                    <div>
                        Already have an account?
                    </div>
                    <div className={'text-neutral-800 cursor-pointer hover:underline'} onClick={registerModal.onClose}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title={'Register'} actionLabel={'Continue'}
               onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
               footer={footerContent}
        />
    )
}
export default RegisterModal