// netlify/functions/serveFile.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { filePath } = event.queryStringParameters;

  // Safely construct file path
  const fullPath = path.join(__dirname, '..', '..', '.netlify', 'blobs-serve', filePath);

  try {
    // Check if the file exists
    if (fs.existsSync(fullPath)) {
      const fileBuffer = fs.readFileSync(fullPath);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/jpeg',  // or adjust based on the file type
        },
        body: fileBuffer.toString('base64'),
        isBase64Encoded: true,
      };
    } else {
      return { statusCode: 404, body: 'File not found' };
    }
  } catch (error) {
    return { statusCode: 500, body: 'Error retrieving file' };
  }
};
