// theme
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

export const presets = [
  // RED
  {
    name: "red",
    lighter: "#FEF3F3",
    light: "#F8A3A3",
    main: "#F14747",
    dark: "#B30D0D",
    darker: "#590707",
    contrastText: "#FFFFFF",
  },
];

export const defaultPreset = presets[0];

export const presetsOption = presets.map((color) => ({
  name: color.name,
  value: color.main,
}));

export function getPresets(key) {
  return {
    default: defaultPreset,
  }[key];
}
