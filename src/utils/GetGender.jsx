import { IoFemale, IoMale } from "react-icons/io5"

export default function GetGender({gender}) {
    if (gender === 'female') return <IoFemale color="red" />
    if (gender === 'male') return <IoMale color="blue" />
}