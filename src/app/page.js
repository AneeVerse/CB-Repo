"use client";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdOpen } from "react-icons/io";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filterData, setFilterData] = useState()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchNameArr, setSearchNameArr] = useState([])
  const [data, setData] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [styleTypes, setStyleTypes] = useState([]);

  const handleOnSearchChange = (e)=>{
    console.log(e.target.value)
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sheet");
      const { data } = await res.json();
      setData(data);

      // Extracting dynamic asset types and style types
      const uniqueAssetTypes = [...new Set(data.map((item) => item[3]))]; // Index 3 for asset types
      const uniqueStyleTypes = [...new Set(data.map((item) => item[4]))]; // Index 4 for style types

      setAssetTypes(uniqueAssetTypes);
      setStyleTypes(uniqueStyleTypes);
    };

    fetchData();
  }, []);
  
  if (data.length === 0) {
    return <Loading/>;
  }
    const filteredData = data.filter((item) => {
      // Main category filter
      if (filter !== "All" && item[0] !== filter) return false;
  
      // Sub-filters for Video (Style and Type)
      if (filter === "Video") {
        if (styleFilter && item[3] !== styleFilter) return false; // Asset Type
        if (typeFilter && item[4] !== typeFilter) return false; // Style Type
      }
      // Sub-filters for Video (Style and Type)
      if (filter === "Design") {
        if (styleFilter && item[3] !== styleFilter) return false; // Asset Type
        if (typeFilter && item[4] !== typeFilter) return false; // Style Type
      }
  
      // Search by name
      if (searchTerm && !item[1].toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
 



  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        {/* Search input */}
        <div className="mt-4 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e)=>{handleOnSearchChange(e)}}
          />
          <div className="bg-white p-3">
            {}
          </div>
        </div>

        {/* Filters */}
        <ul>
          <li className="mb-2">
            <button
              className={`w-full text-left py-2 px-4 rounded ${filter === "All" ? "bg-[#c35de3] text-white" : "bg-gray-200 hover:bg-[#8e41a5] hover:text-white"}`}
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
              className={`w-full text-left py-2 px-4 rounded ${filter === "Design" ? "bg-[#c35de3] text-white" : "bg-gray-200 hover:bg-[#c35de3] hover:text-white"}`}
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
              className={`w-full text-left py-2 px-4 rounded ${filter === "Video" ? "bg-[#c35de3] text-white" : "bg-gray-200 hover:bg-[#c35de3] hover:text-white"}`}
              onClick={() => setFilter("Video")}
            >
              Video
            </button>

            {/* Sub-filters for Video */}
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

      {/* Content Area */}
      <div className="flex-1 p-6 columns-3 space-y-4 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className={`bg-white h-auto px-4 py-4 relative rounded-lg break-inside-avoid shadow-lg  border-[2px] border-[#c35de3]`}
          >
           
       {item[8] &&    <Link href={item[8]} target="_blank" className="absolute flex gap-1 top-[28px] items-center right-6 text-sm rounded-lg text-white px-3 py-2 border-[3px] border-white bg-[#c35de3] font-semibold z-30">{item[6].toUpperCase()}
              <IoMdOpen  className="self-center h-[18px] w-[18px]"/>

            </Link>} 
            {/* Display image, video, or PDF */}
            {item[6] === "PDF" ? (
              <div className="h-[300px] w-full relative border-[5px] border-white mb-[15px] "> {/* Larger height for PDF */}
                <iframe
                  width="100%"
                  height="100%"
                  src={`${item[5]}`}

                ></iframe>
                <div className="border-[#c35de3] border-[6px] h-[300px] -ml-[2px] -mt-[5px] -mr-[4px] rounded-xl  absolute top-0 left-0 z-40"
                style={{width : "calc(100% + 5px)"}}></div>
              </div>
            ) : item[6] === "Video" ? (
              <div className="aspect-w-16 aspect-h-9   "> {/* Smaller size for video */}
                <iframe
                  className="w-full object-cover h-full  border-[6px] mb-[16px] border-[#c35de3] rounded-xl"
                  src={item[5]}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                className="w-full h-[200px] border-[6px] border-[#c35de3] rounded-xl object-cover mb-4"
                src={item[5]} // Image URL from the array
                alt={item[3]} // Title as the alt text
              />
            )}
             <div className="flex w-full justify-center gap-4 text-sm -mt-[37px] relative text-black font-extrabold z-40">
            <div className="bg-[#f1bfa2] px-2 py-1 min-w-[60px] text-center rounded-lg border-[4px] text-[#be6836] border-[#c35de3]">{item[3].toUpperCase()}</div>
            <div className="bg-[#e2dcca] px-2 py-1 min-w-[60px] text-center  rounded-lg  border-[4px] text-[#967d34] border-[#c35de3]">{item[4].toUpperCase()}</div>
            </div>
            <h3 className="text-lg font-semibold mb-2 mt-3">Client Name: {item[1]}</h3>
            {/* <p className="text-gray-500 mb-2">Type: {item[0]}</p> */}
            {/* <p className="text-gray-500 mb-2">Asset Type: {item[3]}</p> */}
            <p className="text-gray-500 mb-2">Design Name: {item[2]}</p>
            {/* <p className="text-sm text-gray-600">Style: {item[4]}</p> */}
            {/* {item[7] && (
              <a
                href={item[7]} // Link to view the image or content
                className="text-blue-500 mt-2 inline-block"
              >
                View
              </a>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
