"use client";

import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";

type props = {
  initialColor: string;
  onChangeComplete: (color: IColor) => void;
};

export default function ColorCodeInp({
  initialColor,
  onChangeComplete,
}: props) {
  const [color, setColor] = useColor(initialColor);

  return (
    <div className="w-[250px]">
      <ColorPicker
        color={color}
        onChange={setColor}
        hideInput={["rgb", "hsv"]}
        hideAlpha
        onChangeComplete={onChangeComplete}
      />
    </div>
  );
}
