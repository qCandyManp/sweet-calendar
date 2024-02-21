import { Dispatch, SetStateAction } from "react"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import * as far from '@fortawesome/free-regular-svg-icons'

export default function Navigation({ date, setDate, refresh }: { date: Date, setDate: Dispatch<SetStateAction<Date>>, refresh: (date: Date) => void }) {

    const changeMonth = (value: number) => {
        let newDate = new Date(date.getFullYear(), date.getMonth() + value, 1)
        setDate(newDate)
        refresh(newDate)
    }

    return (
        <div className="p-4 flex items-center">
            <button onClick={() => changeMonth(-1)} className="text-gray-600 text-2xl">
                <FaIcon icon={far.faArrowAltCircleLeft} />
            </button>
            <div className="flex-1 text-center font-bold text-2xl">
                {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button onClick={() => changeMonth(1)} className="text-gray-600 text-2xl">
                <FaIcon icon={far.faArrowAltCircleRight} />
            </button>
        </div>
    );
}