import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ic_remove from '../../../../public/ic_remove.svg'
import ic_search_18 from '../../../../public/ic_search_18.svg'

export const Header = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  const [valueInput, setValueInput] = useState('')
  const [isShowCancel, setIsShowCancel] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const value = inputRef.current && inputRef.current.value

    setIsShowCancel(true)

    return navigate(value ? `/${value.trim()}` : '/')
  }

  const handleClickRemoveIcon = () => {
    setValueInput('')
  }

  const handleClickCancel = () => {
    setValueInput('')
    setIsShowCancel(false)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-nowrap gap-2 items-center mb-[32px]">
      <div className="relative block">
        <input
          value={valueInput}
          type="text"
          name="search"
          className="border border-[#D9E0E8] rounded-[50px] w-[280px] h-[42px] focus:outline-none focus:border-[#D1B8FA] hover:border-[#D1B8FA] block px-2.5 py-4 pl-10 pr-10 text-sm"
          placeholder="Search"
          ref={inputRef}
          onChange={() => {
            if (inputRef.current) {
              setValueInput(inputRef.current.value)
            }
          }}
        />
        <img
          className="absolute top-[50%] left-[16px] translate-y-[-50%]"
          src={ic_search_18}
          alt="ic_search_18"
        />
        {valueInput && (
          <img
            className="absolute top-[50%] right-[16px] translate-y-[-50%] cursor-pointer"
            src={ic_remove}
            alt="ic_remove"
            onClick={handleClickRemoveIcon}
          />
        )}
      </div>
      {isShowCancel && (
        <div
          onClick={handleClickCancel}
          className="text-[14px] leading-[18px] px-4 py-3 text-[#353C49] hover:bg-[#f3f4f6] rounded-xl cursor-pointer"
        >
          Cancel
        </div>
      )}
    </form>
  )
}
