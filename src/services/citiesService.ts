import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../hooks/useAPI";
import { HttpMethods } from "../lib/API";
import CityModel from "../models/CityModel";

type UseCitiesProps = {
  method?: "get";
};

const UseCitiesService = ({ method = "get" }: UseCitiesProps) => {
  const { error, getData, isLoading } = useAPI<CityModel[]>({});
  const [cities, setCities] = useState<CityModel[]>([]);
  //   const user = useUserStore();
  const CITIES_GET_ENDPOINT = "";

  const getCities = async (
    namePrefix: string,
    limit: number,
    offset: number
  ) => {
    const params = { namePrefix, limit, offset };
    const resp = await getData({
      method: HttpMethods.GET,
      endpoint: CITIES_GET_ENDPOINT,
      body: {},
      headers: {},
      params,
    });
    if (resp) setCities(resp.data.data);
    else if (error) toast.error(`Error: ${error}`);
  };
  const refreshCities = ({ namePrefix = "", limit = 5, offset = 0 }) => {
    getCities(namePrefix, limit, offset);
  };

  useEffect(() => {
    if (method === "get") refreshCities({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cities,
    error,
    isLoading,
    refreshCities,
  };
};

export default UseCitiesService;
