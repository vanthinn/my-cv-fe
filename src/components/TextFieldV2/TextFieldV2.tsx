import { FC } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
interface IProps {
  error?: any
  onChange?: any
  placeholder?: string
  disabled?: boolean
  value?: string
  type?: string
  width?: string
}

const CustomTextInput = ({
  error,
  onChange,
  value,
  placeholder,
  disabled,
  type,
  width,
}: any): JSX.Element => {
  return (
    <div className={`flex flex-col gap-1 relative `}>
      {type && (
        <div className="absolute top-1/2 -translate-y-1/2">
          <HiOutlineSearch className="text-xl text-gray-400 mx-4 cursor-pointer" />
        </div>
      )}
      <input
        disabled={disabled}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${width ? `w-[${width}px]` : 'w-auto'}  ${
          type === 'search' ? 'pr-3 pl-12' : 'px-3'
        }   py-2.5 bg-[#E6F0F6] rounded-md outline-none ${
          !!error && 'border border-red-600'
        } ${disabled && 'cursor-not-allowed text-gray-400'} 
        focus:bg-[#cbe0ec]
`}
      />
      {!!error && <span className="text-red-600 text-sm">{error?.message}</span>}
    </div>
  )
}

const TextFieldV2: FC<IProps> = ({
  placeholder,
  disabled,
  error,
  onChange,
  value,
  type,
  width,
}: IProps): JSX.Element => {
  return (
    <CustomTextInput
      disabled={disabled}
      error={error}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      width={width}
    />
  )
}

export default TextFieldV2
