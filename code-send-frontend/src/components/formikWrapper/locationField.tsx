import React, { useState, useEffect, useCallback } from "react";
import { Form, AutoComplete } from "antd";
import { useField } from "formik";
import codeSendService from "utils/api/codeSendService";
import { Location } from "interfaces/Geocoding";

interface LocationFieldProps {
  label: string;
  name: string;
}

export const LocationField: React.FC<LocationFieldProps> = ({
  name,
  label
}) => {
  const [, meta, helper] = useField({ name });
  const [query, setQuery] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const locations = await codeSendService.forwardGeocoding(query);
      setLocations(locations);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelect = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      const location = locations.find(
        location => location.name.toLowerCase() === value.toLowerCase()
      );
      helper.setValue(location);
    },
    [locations, helper]
  );

  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={meta.error && "error"}
      help={meta.error}
      htmlFor={name}
    >
      <AutoComplete
        id={name}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onChange={handleChange}
        value={query}
      >
        {locations.map(location => (
          <AutoComplete.Option key={location.name} value={location.name}>
            {location.name}
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    </Form.Item>
  );
};
