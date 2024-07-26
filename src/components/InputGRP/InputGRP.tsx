import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type props = {
  type: HTMLInputTypeAttribute;
  label: string;
  inputId: string;
  errorMsg: string | string[];
  placeholder: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function InputGRP(props: props) {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <label htmlFor={props.inputId} className="text-xl font-semibold">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.inputId}
        className="px-2 py-1.5 text-lg text-black font-medium rounded-md bg-gray-300 outline-none placeholder:text-gray-900 focus:bg-gray-100"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />

      {typeof props.errorMsg === "string" ? (
        <p className="text-base text-danger -mt-1">{props.errorMsg}</p>
      ) : (
        <ul className="flex flex-col -mt-1">
          {props.errorMsg.map((err, i) => (
            <li key={i} className="list-disc list-inside text-base text-danger">
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
