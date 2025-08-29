import { useEffect, useState } from "react"


const useDebounce = (value , delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=> {
        const timerId = setTimeout(()=> {
            setDebouncedValue(value);
        },delay)

        return ()=> clearTimeout(timerId);
    },[value, delay]);

    return debouncedValue;
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // Debounce for 500ms

  // Example: useEffect for API call
  useEffect(() => {
    if (debouncedValue) {
      console.log('Trigger API with:', debouncedValue);
      // call your API here
    }
  }, [debouncedValue]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBar;