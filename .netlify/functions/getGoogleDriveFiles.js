const fetch = require("node-fetch");

exports.handler = async (event) => {
  const folderId = event.queryStringParameters.folderId;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!folderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing folderId parameter" }),
    };
  }

  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink)`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.files),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
