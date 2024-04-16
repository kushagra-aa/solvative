import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../hooks/useAPI";
import { HttpMethods } from "../lib/API";
import CityModel from "../models/CityModel";

type UseCitiesProps = {
  method?: "get" | "";
};
type CityResponseType = {
  data: CityModel[];
  metadata: { totalCount: number };
};

const UseCitiesService = ({ method = "" }: UseCitiesProps) => {
  const { error, getData, isLoading } = useAPI<CityResponseType>({});
  const [cities, setCities] = useState<CityModel[]>([]);
  const [totalCities, setTotalCities] = useState(100);
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
    if (resp) {
      const fixedResp = resp.data as unknown as CityResponseType;
      setCities(fixedResp.data);
      setTotalCities(fixedResp.metadata.totalCount);
    } else if (error) toast.error(`Error: ${error}`);
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
    totalCities,
  };
};

export default UseCitiesService;
