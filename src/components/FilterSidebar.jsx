// components/FilterSidebar.js
export default function FilterSidebar({
  filter,
  setFilter,
  styleFilter,
  setStyleFilter,
  typeFilter,
  setTypeFilter,
  searchTerm,
  setSearchTerm,
  assetTypes,
  styleTypes,
}) {
  return (
    <div className="w-1/4 bg-white shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Search input */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <ul>
        <li className="mb-2">
          <button
            className={`w-full text-left py-2 px-4 rounded ${filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
            onClick={() => {
              setFilter("All");
              setStyleFilter("");
              setTypeFilter("");
            }}
          >
            All
          </button>
        </li>
        <li className="mb-2">
          <button
            className={`w-full text-left py-2 px-4 rounded ${filter === "Design" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
            onClick={() => {
              setFilter("Design");
              setStyleFilter("");
              setTypeFilter("");
            }}
          >
            Design
          </button>
          {filter === "Design" && (
            <div className="ml-4 mt-2">
              <select
                className="w-full mb-2 p-2 border rounded bg-gray-100"
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
              >
                <option value="">Select Asset Type</option>
                {assetTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="w-full p-2 border rounded bg-gray-100"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Select Style Type</option>
                {styleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        </li>
        <li className="mb-2">
          <button
            className={`w-full text-left py-2 px-4 rounded ${filter === "Video" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
            onClick={() => setFilter("Video")}
          >
            Video
          </button>
          {filter === "Video" && (
            <div className="ml-4 mt-2">
              <select
                className="w-full mb-2 p-2 border rounded bg-gray-100"
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
              >
                <option value="">Select Asset Type</option>
                {assetTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="w-full p-2 border rounded bg-gray-100"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Select Style Type</option>
                {styleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
