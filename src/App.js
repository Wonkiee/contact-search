import React, { useState } from "react";
import data from "./data.json";
import SearchForm from "./components/SearchForm";
import ContactTable from "./components/ContactTable";
import SelectedContact from "./components/SelectedContact";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const applyFilters = () => {
    setFilteredData(
      data.filter((contact) =>
        Object.keys(filters).every((key) => {
          const filterValue = filters[key]?.toLowerCase() || "";
          let contactValue = contact[key]?.toLowerCase() || "";

          if (
            key === "street" ||
            key === "city" ||
            key === "state" ||
            key === "zip"
          ) {
            contactValue = contact?.address[key]?.toLowerCase() || "";
          }

          return contactValue.includes(filterValue);
        })
      )
    );
  };

  const handleSelectContact = (contact, isSelected) => {
    if (isSelected) {
      setSelectedContacts((prev) => [...prev, contact]);
    } else {
      setSelectedContacts(
        (prev) => prev.filter((c) => c.email !== contact.email) // Assuming email is unique
      );
    }
  };

  const onPageChange = (page) => setCurrentPage(page);

  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="app-container">
      <div className="search-container">
        <SearchForm filters={filters} setFilters={setFilters} />
        <button className="search-button" onClick={applyFilters}>
          Search
        </button>
      </div>
      <div className="results-container">
        <ContactTable data={displayedData} onSelect={handleSelectContact} />
        <Pagination
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={onPageChange}
        />
      </div>
      <div className="selected-contact-container">
        <SelectedContact selectedContacts={selectedContacts} />
      </div>
    </div>
  );
};

export default App;
