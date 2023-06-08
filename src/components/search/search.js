import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOption, GEO_API_URL } from '../../api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?&namePrefix=${inputValue}`,
                geoApiOption
            );

            const result = await response.json();

            if (result.data) {
                const options = result.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    };
                });

                return { options };
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
