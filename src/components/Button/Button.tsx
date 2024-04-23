export enum TypesButton {
  'primary',
  'outline',
  'disabled',
  'elevated',
  'reject',
  'gradient',
  'approve',
  'blue',
  'cancel',
  'black',
}

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  typeButton?: keyof typeof TypesButton
  loading?: boolean
  //   innerRef?: any
}

const Button = ({ typeButton = 'primary', loading, ...props }: IButton) =>
  //   ref: any,
  {
    const _checkTypeButton = () => {
      let result = ''

      switch (typeButton) {
        case TypesButton[1]: {
          result =
            'transition-all duration-300 border border-gray-400 py-2 px-4 rounded-md font-semibold'
          break
        }
        case TypesButton[2]: {
          result = 'transition-all duration-500 hover:transform hover:translate-y-[-4px] '
          break
        }
        case TypesButton[3]: {
          result =
            'transition-all duration-500 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          break
        }
        case TypesButton[4]: {
          result =
            'transition-all duration-500 bg-red-400 hover:bg-red-600 text-black hover:text-white border border-red-400 rounded-2xl shadow'
          break
        }
        case TypesButton[5]: {
          result =
            'transition-all duration-500 bg-gradient-to-r from-[#D5B376] to-[#C28517] hover:from-[#C28517] hover:to-[#C28517]'
          break
        }
        case TypesButton[6]: {
          result =
            'transition-all duration-500 bg-[#A3DA8F] hover:bg-[#07ea48] text-black hover:text-white  border border-[#A3DA8F] rounded-2xl shadow'
          break
        }
        case TypesButton[7]: {
          result =
            'transition-all duration-500 bg-[#3367d6] hover:bg-[#1a55d1] text-white font-semibold py-2 px-4 border border-[#3367d6] rounded shadow'
          break
        }
        case TypesButton[8]: {
          result =
            'transition-all duration-300 bg-[#efebeb] hover:bg-[#f4f4f4] text-black font-semibold py-1.5 px-4 border border-[#f4f4f4] rounded-2xl shadow focus:outline-none focus:ring-0'
          break
        }
        case TypesButton[9]: {
          result =
            'transition-all duration-300 bg-[#000] hover:bg-[#fff] text-[#fff] hover:text-[#000] font-semibold py-1.5 px-4 rounded-md shadow focus:outline-none focus:ring-0'
          break
        }
        case TypesButton[0]:
        default: {
          result =
            'transition-all duration-300 bg-[#154dc5] hover:bg-[#1a55d1] text-white font-semibold py-1.5 px-4 border border-[#3367d6] rounded-md shadow focus:outline-none focus:ring-0'
          break
        }
      }

      if (props?.disabled) {
        result = result + ' opacity-50 cursor-not-allowed'
      }

      return result
    }

    return (
      <button
        {...props}
        //   ref={innerRef}
        className={`${_checkTypeButton()} ${props?.className}`}>
        <div className="flex justify-center items-center">
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {props?.children}
        </div>
      </button>
    )
  }

export default Button
