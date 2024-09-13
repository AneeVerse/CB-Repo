// components/ContentGrid.js
export default function ContentGrid({ data }) {
    return (
      <div className="flex-1 p-6 grid auto-rows-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow-lg ${item[6] === "PDF" ? "row-span-2" : ""}`}>
            {/* Display image, video, or PDF */}
            {item[6] === "PDF" ? (
              <div className="h-[500px]">
                <iframe width="100%" height="100%" src={item[5]}></iframe>
              </div>
            ) : item[6] === "Video" ? (
              <div className="aspect-w-16 aspect-h-9 h-[200px] mb-4">
                <iframe className="w-full h-full" src={item[5]} frameBorder="0" allowFullScreen></iframe>
              </div>
            ) : (
              <img className="w-full h-[200px] object-cover mb-4" src={item[5]} alt={item[3]} />
            )}
            <h3 className="text-lg font-semibold mb-2">{item[3]}</h3>
            <p className="text-gray-500 mb-2">Type: {item[0]}</p>
            <p className="text-gray-500 mb-2">Name: {item[1]}</p>
            <p className="text-gray-500 mb-2">Format: {item[6]}</p>
            <p className="text-sm text-gray-600">Description: {item[4]}</p>
            {item[7] && (
              <a href={item[7]} className="text-blue-500 mt-2 inline-block">
                View
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }
  