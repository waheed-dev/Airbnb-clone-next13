'use client'
import Modal from "@/app/components/modals/modal";
import useRentModal from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import Heading from "@/app/Heading";
import {categories} from "@/app/components/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "@/app/components/inputs/ContrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5

}

const RentModal = () => {
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const [step, setStep] = useState(STEPS.CATEGORY)
    const {register, watch, handleSubmit, setValue, formState: {errors}, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }
        setIsLoading(true)
        axios.post('/api/listings',data).then(() => {
            toast.success('Listing created')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch(() => {
            toast.error('Something went wrong!')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])
    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false
    }), [location])
    const rentModal = useRentModal()
    let bodyContent = (<div className={'flex flex-col gap-5'}>
        <Heading title={'Which of these best describes your place'} subtitle={'pick a category'}/>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'}>
            {categories.map(item => (
                <div key={item.label} className={'col-span-1'}>
                    <CategoryInput onClick={(category) => setCustomValue('category', category)}
                                   selected={category === item.label} label={item.label} icon={item.icon}/>
                </div>
            ))}
        </div>
    </div>)
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Where is your place located'} subtitle={'help guests find you'}/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)}/>
                <Map center={location?.latLng}/>
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Share some basics about your place'} subtitle={'What amenities do u have?'}/>
                <Counter title={'Guests'} onChange={(value) => setCustomValue('guestCount', value)}
                         subTitle={'How many guest do u allows?'} value={guestCount}/>
                <hr/>
                <Counter title={'Rooms'} onChange={(value) => setCustomValue('roomCount', value)}
                         subTitle={'How many rooms do u have?'} value={roomCount}/>
                <hr/>
                <Counter title={'Bathroom'} onChange={(value) => setCustomValue('bathroomCount', value)}
                         subTitle={'How many bathrooms do u have?'} value={bathroomCount}/>
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Add a photo of your place'} subtitle={'show guests what your place looks like!'}/>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'How would you describe your place'} subtitle={'Short and sweet works best!'}/>
                <Input id={'title'} label={'Title'} disabled={isLoading} required errors={errors} register={register}/>
                <hr/>
                <Input id={'description'} label={'Description'} disabled={isLoading} required errors={errors} register={register}/>
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Now, set your price'} subtitle={'How much do u charge per night?'}/>
                <Input id={'price'} label={'Price'} disabled={isLoading} formatPrice type={'number'} required errors={errors} register={register}/>
            </div>
        )
    }
    return <Modal title={'Airbnb your home!'} isOpen={rentModal.isOpen} onSubmit={handleSubmit(onSubmit)}
                  actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} body={bodyContent}
                  secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} onClose={rentModal.onClose}/>
}

export default RentModal