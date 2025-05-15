import { UseFormRegisterReturn } from "react-hook-form";

export default function Input({ type, label, form, placeholder, isRequired, error }: {
    type: string,
    label: string,
    form: UseFormRegisterReturn,
    placeholder?: string,
    isRequired?: boolean,
    error?: string,
}) {

    const phoneClasses = type === "number" && "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

    return (
        <div className="form-group">
            <label htmlFor={label.toLocaleLowerCase()} className="font-bold">{label} {isRequired && <span className="text-red-500 font-medium">*</span>}</label>
            <input type={type} id={label.toLocaleLowerCase()} {...form} placeholder={placeholder} className={`w-full p-2 bg-white border border-[#94949440] rounded-lg mt-4 ${phoneClasses}`} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}
