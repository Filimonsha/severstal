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
export interface IImages{
    id:number,
    number:number,
    light:string,
    file_full:string,
    file_crop:string,
    file_res_full:string,
    file_res_crop:string,
    defects:Array<IDefects>,
}

export interface ITypeOfPropduct {
  id: number;
  name: string;
}

export interface IDefects{
    name:string,
    ranges:Array<IRanges>,
    score:number,
}

export interface IRanges{
    bottom:number|null,
    top:number|null,
    amount:number,
    score:number,
}
