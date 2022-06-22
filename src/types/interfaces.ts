export interface ITest {
  id: number;
  number: string;
  product_type: number;
  measurement_technique: 0;
  melting_number: string;
  comment: string;
  date: string | null;
  segments: Array<ISegment>;
  score: IScore;
  ranges: IRanges;
  sizes: Array<string>;
  stillAnalysing: boolean;
}
export interface IScore {
  ОР: number;
  ОХН: number;
}
export interface ISegment {
  id: string;
  test: string;
  length: string;
  width: string;
  images: Array<IImages>;
}
export interface IImages {
  id: number;
  number: number;
  // light: string;

  file_top_full: string;
  file_top_crop: string;
  file_front_full: string;
  file_front_crop: string;
  file_res_full: string;
  file_res_crop: string;
  defects: Array<IDefects>;
  needToAnylyse: boolean;
}

export interface ITypeOfPropduct {
  id: number;
  name: string;
}

export interface IDefects {
  name: string;
  ranges: Array<IRange>;
  score: number;
}

export interface IRange {
  bottom: number | null;
  top: number | null;
  amount: number;
  score: number;
}

export interface IRanges {
  ОР: Array<IRange>;
  ОХН: Array<IRange>;
}
