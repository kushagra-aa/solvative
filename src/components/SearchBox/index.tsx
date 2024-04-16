import React, { useEffect, useRef, useState } from "react";
import useDebounce from "./../../hooks/useDebounce"; // Replace with your useDebounce hook path
import "./index.css";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void; // External search function
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null); // Adjust debounce time as needed

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm) {
      onSearch(searchTerm);
    }
  };
  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  useDebounce({
    callback: () => {
      onSearch(searchTerm);
    },
    dependencies: [searchTerm],
    timeoutDuration: 500,
  });

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  return (
    <div className="search-box">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyUp={handleKeyUp}
      />
      <span className="search-shortcut">Ctrl + /</span>
    </div>
  );
};

export default SearchBox;
