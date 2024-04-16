import { ReactNode } from "react";
import "./index.css";

export type HeaderType = { name: string; type: "text" | "image" | "link" };
export type TablePropsType = {
  headers: HeaderType[];
  data: { raw: unknown; row: string[] }[];
  actions: TableActionType[];
};

export type TableActionType = {
  name: string;
  icon?: ReactNode;
  className?: string;
  onClick: (data: unknown) => void;
};

function Table({ headers, data, actions }: TablePropsType) {
  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.name}</th>
            ))}
            {actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(({ raw, row }, rowIndex) => (
            <tr key={rowIndex}>
              {row?.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${
                    headers[cellIndex].name === "#"
                      ? "index"
                      : headers[cellIndex].type
                  }-cell`}
                >
                  {headers[cellIndex].type === "text" ? (
                    `${cell}`
                  ) : headers[cellIndex].type === "link" ? (
                    <a href={cell}>`${cell}`</a>
                  ) : headers[cellIndex].type === "image" ? (
                    <img src={cell} alt="No result found" />
                  ) : null}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="actions">
                  {actions.map((action) => (
                    <button
                      className={action.className}
                      title={action.name}
                      onClick={() => action.onClick(raw)}
                    >
                      {action.name}
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
