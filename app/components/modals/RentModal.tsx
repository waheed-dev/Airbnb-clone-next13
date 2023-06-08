'use client'
import Modal from "@/app/components/modals/modal";
import useRentModal from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import Heading from "@/app/Heading";
import {categories} from "@/app/components/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, useForm} from "react-hook-form";
import CountrySelect from "@/app/components/inputs/ContrySelect";
import dynamic from "next/dynamic";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5

}

const RentModal = () => {
    const [step,setStep] = useState(STEPS.CATEGORY)
    const {register,watch,handleSubmit,setValue,formState : {errors},reset} = useForm<FieldValues>({
        defaultValues : {
            category : '',
            location : null,
            guestCount : 1,
            roomCount : 1,
            bathroomCount : 1,
            imageScr : '',
            price : 1,
            title : '',
            description : '',
        }
    })
    const category = watch('category')
    const location = watch('location')

    const setCustomValue = (id :string,value : any) => {
        setValue(id,value,{
            shouldDirty : true,
            shouldValidate : true,
            shouldTouch : true,
        })
    }

     const onBack = () => {
        setStep((value) => value-1)
     }
    const onNext = () => {
        setStep((value) => value+1)
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    },[step])
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined
        }
        return 'Back'
    },[step])
    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'),{
        ssr : false
    }),[location])
    const rentModal = useRentModal()
    let bodyContent =( <div className={'flex flex-col gap-5'}>
            <Heading title={'Which of these best describes your place'} subtitle={'pick a category'}/>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'}>
            {categories.map(item => (
                <div key={item.label} className={'col-span-1'}>
                    <CategoryInput onClick={(category) => setCustomValue('category',category)} selected={category === item.label} label={item.label} icon={item.icon}/>
                </div>
            ))}
        </div>
        </div>)
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Where is your place located'} subtitle={'help guests find you'}/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location',value)}/>
                <Map center={location?.latLng}/>
            </div>
        )
    }

    return <Modal title={'Airbnb your home!'} isOpen={rentModal.isOpen} onSubmit={onNext}
                  actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} body={bodyContent} secondaryAction={step=== STEPS.CATEGORY ? undefined : onBack} onClose={rentModal.onClose}/>
}

export default RentModal