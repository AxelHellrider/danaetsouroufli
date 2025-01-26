import fetch from 'node-fetch';

let cache = {}; // In-memory cache to store API responses temporarily

exports.handler = async (event) => {
  const folderId = event.queryStringParameters.folderId;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!folderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing folderId parameter" }),
    };
  }

  // Check cache first to avoid repeated API calls
  if (cache[folderId]) {
    console.log(`Cache hit for folder: ${folderId}`);
    return {
      statusCode: 200,
      body: JSON.stringify(cache[folderId]), 
    };
  }

  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;
  
  try {
    const files = await fetchWithRetry(url, 3); // Retry 3 times if needed

    // Store result in cache to minimize future requests
    cache[folderId] = files;

    return {
      statusCode: 200,
      body: JSON.stringify(files),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// Exponential backoff function for handling API rate limits
async function fetchWithRetry(url, retries, delay = 1000) {
  try {
    const response = await fetch(url);

    if (response.status === 429 && retries > 0) {
      console.warn(`Rate limit exceeded. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.files;
  } catch (error) {
    if (retries === 0) throw new Error(`Failed after retries: ${error.message}`);
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}
