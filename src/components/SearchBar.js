import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from "../api";

export default function SearchBar({ onSelect }) {

    const [search, setSearch] = useState("");

    const loadOptions = (input) => {
        return fetch(`${GEO_API_URL}?minPopulation=100000&namePrefix=${input}`, geoApiOptions)
            .then(res => res.json())
            .then(res => {
                return {
                    options: res.data.map((city) => {
                        return ({
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        })
                    })
                }
            })
            .catch((err) => console.error(err));
    }


    const handleSearchChange = (data) => {
        setSearch(data.value);
        onSelect(data.value);
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '500px',
            borderRadius: '5px',
            border: '2px solid #ccc',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#3699FF' : null,
            color: state.isFocused ? 'white' : null,
        }),
    }

    return <div className='main-search'>
        <AsyncPaginate className='dropdown'
            placeholder="Search for a city"
            debounceTimeout={600}
            value={search}
            onChange={handleSearchChange}
            loadOptions={loadOptions}
            styles={customStyles}

        /> </div>
}