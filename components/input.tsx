import { UseFormRegisterReturn } from "react-hook-form";

export default function Input({ type, label, form, isRequired, error }: {
    type: string,
    label: string,
    form: UseFormRegisterReturn,
    isRequired?: boolean,
    error?: string,
}) {

    return (
        <div className="form-group">
            <label htmlFor={label.toLocaleLowerCase()} className="font-bold">{label} {isRequired && <span className="text-red-500 font-medium">*</span>}</label>
            <input type={type} id={label.toLocaleLowerCase()} {...form} className={`w-full p-2 bg-[#F1F1F180] border-1 border-[#D3D3D3] rounded-2xl mt-2 placeholder:text-[#e9e9e9]`} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}
