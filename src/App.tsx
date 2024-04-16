import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import getLimitOffset from "./helpers/getLimitOffset";
import makeTableProps from "./helpers/makeTableProps";
import UseCitiesService from "./services/citiesService";

function App() {
  const { cities, isLoading, refreshCities, totalCities } = UseCitiesService(
    {}
  );
  const [pageConfig, setPageConfig] = useState({ page: 1, size: 5 });
  const pageSizeOptions = [5, 10, 25];

  const handlePageSizeChange = (newSize: number) => {
    setPageConfig((c) => ({ ...c, size: newSize, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPageConfig((c) => ({ ...c, page: newPage }));
  };

  const getCitiesHandler = async ({
    namePrefix = "",
    limit = 5,
    offset = 0,
  }: {
    namePrefix?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
  }) => {
    refreshCities({ namePrefix, limit, offset });
  };

  const { actions, data, headers } = makeTableProps(
    cities,
    [
      { name: "#", key: "__table_index__", type: "text" },
      { name: "Place Name", key: "city", type: "text" },
      {
        name: "Country",
        key: "countryCode",
        type: "image",
        prefix: "https://flagsapi.com/",
        postfix: "/flat/64.png",
      },
    ],
    []
  );

  useEffect(() => {
    const { limit, offset } = getLimitOffset(pageConfig);
    getCitiesHandler({ limit, offset });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageConfig]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <SearchBox
        onSearch={(s) => {
          console.log("s", s);
        }}
      />
      <Table actions={actions} data={data} headers={headers} />
      <Pagination
        totalItems={totalCities}
        currentPage={pageConfig.page}
        pageSize={pageConfig.size}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
