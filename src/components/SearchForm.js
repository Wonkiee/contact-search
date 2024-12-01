const SearchForm = ({ filters, setFilters, handleSearch }) => {
  const states = [
    "AB",
    "BC",
    "MB",
    "NB",
    "NL",
    "NS",
    "NT",
    "ON",
    "PE",
    "QC",
    "SK",
    "YT",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      {/* Left Column */}
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={filters.firstName || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={filters.lastName || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={filters.dob || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={filters.email || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={filters.phone || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {/* Right Column */}
      <div>
        <label>
          Street Address:
          <input
            type="text"
            name="street"
            value={filters.street || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={filters.city || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:
          <select
            name="state"
            value={filters.state || ""}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip"
            value={filters.zip || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </form>
  );
};
export default SearchForm;
