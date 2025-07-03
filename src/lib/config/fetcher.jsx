const baseUrl = process.env.URL;

const getCacheControl = (pageTypeNum) => {
  const cacheMap = {
    1: "no-store",
    2: "force-cache",
  };

  // Default to 'no-store' if pageTypeNum is invalid or not provided
  return cacheMap[pageTypeNum] || "no-store";
};

const Fetcher = async (endPoint, pageTypeNum, method = "GET", body) => {
  const cacheType = getCacheControl(pageTypeNum); // Get appropriate cache control

  const fetchOptions = {
    method, // Use the provided method (GET, POST, PUT, PATCH)
    cache: cacheType, // Use the determined cache control
    headers: {
      "Content-Type": "application/json", // Set Content-Type for POST, PUT, PATCH
    },
  };

  // Add body to the request for POST, PUT, PATCH
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}${endPoint}`, fetchOptions);
    // console.log(`${baseUrl}${endPoint}`);
    // if (response.message !== 200) {
    //   throw new Error(`Failed to fetch: ${response.message}`);
    // }
    
    const data = await response.json(); // Assuming response is JSON
    // console.log(data);
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow error to be handled by the calling function
  }
};

export default Fetcher;
