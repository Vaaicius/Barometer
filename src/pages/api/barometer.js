// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(request, response) {
  const { city }  = request.query;

  const weatherApiResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
  const weatherData = await weatherApiResponse.json();

  return response.status(200).json(weatherData)
}
