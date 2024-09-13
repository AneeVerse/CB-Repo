// pages/api/sheets.js

export async function GET(req, res) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID; // Your Google Sheet ID
  console.log("api key", API_KEY)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A2:I?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache', // Ensure no caching of the API response
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    const data = await response.json();
    
    console.log("data", data.values)
    
    return new Response(
      JSON.stringify({ data: data.values }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store', // Disable caching on client-side as well
        },
      }
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from Google Sheets' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
