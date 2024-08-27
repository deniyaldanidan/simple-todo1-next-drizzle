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
      <label
        htmlFor={inputId}
        className="block w-fit text-xl font-semibold laptop-md:text-lg tablet:text-[1.1rem] tablet:leading-5 mobile-sm:text-[1.05rem]"
      >
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
        <p className="text-base text-danger leading-6 -mt-1 tablet:text-[0.95rem] mobile-sm:text-[0.925rem]">
          {errorMsg}
        </p>
      ) : (
        <ul className="flex flex-col -mt-1">
          {errorMsg.map((err, i) => (
            <li
              key={i}
              className="list-disc list-inside text-base text-danger leading-6 tablet:text-[0.95rem] mobile-sm:text-[0.925rem]"
            >
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
