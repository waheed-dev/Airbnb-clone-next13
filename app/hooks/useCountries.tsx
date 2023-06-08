import countries from 'world-countries'

const formattedCounties = countries.map(country =>({
    value : country.cca2,
    label : country.name.common,
    flag : country.flag,
    latLng : country.latlng,
    region : country.region
}) )

const useCountries = () => {
    const getAll = () => formattedCounties
    const getByValue = (value : string) => {
        return formattedCounties.find(country => country.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries