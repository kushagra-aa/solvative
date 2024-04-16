import { useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import makeTableProps from "./helpers/makeTableProps";
import UseCitiesService from "./services/citiesService";

function App() {
  const { cities, isLoading, refreshCities } = UseCitiesService({});

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
    refreshCities({});
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <SearchBox
        onSearch={(s) => {
          console.log("s", s);
        }}
      />
      <Table actions={actions} data={data} headers={headers} />
    </>
  );
}

export default App;
