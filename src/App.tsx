import { useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import UseCitiesService from "./services/citiesService";

function App() {
  const { cities, isLoading, refreshCities } = UseCitiesService({});

  useEffect(() => {
    refreshCities({});
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      {cities.map((c) => (
        <p>{c.city}</p>
      ))}
    </>
  );
}

export default App;
