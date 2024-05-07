import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL,geoApiOptions } from "./api";

/*const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  console.log("inirial serach value: " , search)
  useEffect(() => {
    // Load initial options when the component is first mounted
    loadOptions("");
  }, []);

  const loadOptions = async (inputValue) => {
    console.log("THis is called without typing")
    console.log("input value is ", inputValue)
    console.log(`url : ${GEO_API_URL}/cities?namePrefix=${inputValue}`)
    const response = await fetch(
          `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
          geoApiOptions
      );
      const response_1 = await response.json();
      if( !Array.isArray(response)){
                return { options: [] };
            }
      return {
            
          options: response_1.data.map((city) => {
              return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
              };
          }),
      };
  };

  const handleOnChange = (searchData) => {
    console.log("Data changed: ", searchData)
    setSearch(searchData);
    //loadOptions(searchData)
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;*/

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
          `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
          geoApiOptions
      );
      const response_1 = await response.json();
      return {
          options: response_1.data.map((city) => {
              return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
              };
          }),
      };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
