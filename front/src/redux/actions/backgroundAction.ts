export const BACKGROUND_CHANGE = "BACKGROUND_CHANGE" as const;

export const backgroundChange = (data: string) => {
  return {
    type: BACKGROUND_CHANGE,
    payload: data,
  };
};

export type BackgroundAction = ReturnType<typeof backgroundChange>;
