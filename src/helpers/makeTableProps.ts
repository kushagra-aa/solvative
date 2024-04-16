import { TableActionType, TablePropsType } from "../components/Table";

export type HeadersConfigType<T> = {
  name: string;
  key: keyof T | "__table_index__";
  type: TablePropsType["headers"][number]["type"];
  prefix?: string;
  postfix?: string;
}[];

const makeTableProps = <T>(
  data: T[],
  headersConfig: HeadersConfigType<T>,
  actions: TableActionType[]
): TablePropsType => {
  const headers: TablePropsType["headers"] = headersConfig.map((header) => ({
    name: header.name,
    type: header.type,
  }));
  const rows: { raw: T; row: string[] }[] = data.map((d, rowIndex) => ({
    raw: d,
    row: headersConfig.map((h) => {
      let result = "";
      if (h.key === "__table_index__") result = (rowIndex + 1).toString();
      else if (d[h.key]) {
        result = `${d[h.key]}`;
        if (h.postfix) result = result + h.postfix;
        if (h.prefix) result = h.prefix + result;
      } else result = "-";

      return result;
    }),
  }));

  return { headers, data: rows, actions };
};
export default makeTableProps;
