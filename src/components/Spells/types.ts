export type GettingDataType = {
  count: number | undefined;
  results: ResultsType[] | undefined;
};

export type ResultsType = {
  index: string | undefined;
  name: string | undefined;
  url: string | undefined;
  isFavourite: Boolean | undefined;
};

export type SpellDetalisProp = {
  path: string;
};
