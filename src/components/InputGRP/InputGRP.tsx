import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type props = {
  type?: HTMLInputTypeAttribute;
  label: string;
  inputId: string;
  errorMsg: string | string[];
  placeholder: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  textArea?: true;
  textAreaRows?: number;
  min?: string;
};

export default function InputGRP({
  inputId,
  label,
  type,
  placeholder,
  errorMsg,
  onChange,
  textArea,
  value,
  textAreaRows,
  min,
}: props) {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <label htmlFor={inputId} className="text-xl font-semibold">
        {label}
      </label>
      {textArea === true ? (
        <textarea
          id={inputId}
          className="inp-base-classes"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={textAreaRows}
        ></textarea>
      ) : (
        <input
          type={type}
          id={inputId}
          className="inp-base-classes"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
        />
      )}

      {typeof errorMsg === "string" ? (
        <p className="text-base text-danger -mt-1">{errorMsg}</p>
      ) : (
        <ul className="flex flex-col -mt-1">
          {errorMsg.map((err, i) => (
            <li key={i} className="list-disc list-inside text-base text-danger">
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
