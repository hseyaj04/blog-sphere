import React, {useId} from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type="text",
        className="",
        ...props
    }, ref){
        const id = useId();
        return <div className='w-full'>
            {
            label && 
            <label 
            className='inline-block mb-1 pl-1'
            htmlFor={id}
            >{label}
            </label>
            }
            <input
            className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            
        </div>
    }
)

export default Input