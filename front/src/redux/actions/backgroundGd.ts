export const BACKGROUND_GD_TYPE_GREEN = "BACKGROUND_GD_TYPE_GREEN" as const;
export const BACKGROUND_GD_TYPE_ORANGE = "BACKGROUND_GD_TYPE_ORANGE" as const;
export const BACKGROUND_GD_TYPE_PASTEL = "BACKGROUND_GD_TYPE_PASTEL" as const;
export const BACKGROUND_GD_TYPE_PUPPLE = "BACKGROUND_GD_TYPE_PUPPLE" as const;

export const backgroundToGreen = () => {
  return {
    type: BACKGROUND_GD_TYPE_GREEN,
  };
};
export const backgroundToOrange = () => {
  return {
    type: BACKGROUND_GD_TYPE_ORANGE,
  };
};
export const backgroundToPastel = () => {
  return {
    type: BACKGROUND_GD_TYPE_PASTEL,
  };
};
export const backgroundToPupple = () => {
  return {
    type: BACKGROUND_GD_TYPE_PUPPLE,
  };
};

export type BackgroundAction =
  | ReturnType<typeof backgroundToGreen>
  | ReturnType<typeof backgroundToOrange>
  | ReturnType<typeof backgroundToPastel>
  | ReturnType<typeof backgroundToPupple>;