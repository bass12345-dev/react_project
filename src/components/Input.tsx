import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "../utils/InputUtils";

export const Input = ({ 
   label, 
   type, 
   id, 
   placeholder,
   name,
   validation
 }: {
   label: string;
   type: string;
   id: string;
   placeholder: string;
   name: string;
   
   validation : any
 }) => {

    const {
        register,
        formState: { errors },
      } = useFormContext()


      const inputError = findInputError(errors, name, label)
      const isInvalid = isFormInvalid(inputError)
     
    
   return(
     <div className="flex flex-col gap-y-1">
       <label htmlFor="first_name" className="text-white text-md text-left font-varela">{label}</label>
       <input id={id} type={type} placeholder={placeholder}  className="bg-gray-50 mx-0 border border-gray-300 text-gray-900 text-sm font-varela rounded-lg w-full p-2"
       {...register(name,validation)}
       
       />
         <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={` ${inputError.label} ${inputError.error.message}`}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
     </div>
   )
 }


 const InputError = ({ message } : {message : any}) => {
    return (
      <motion.p
        className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md justify-center"
        {...framer_error}
      >
       {message}
      </motion.p>
    )
  }

  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  }
