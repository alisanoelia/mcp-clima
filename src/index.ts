import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

const server = new McpServer({
  name: "Clima",
  version: "0.4.0",
});

server.tool(
  "getWeather",
  "Solicito los siguientes datos meteorológicos para el día actual: temperatura, sensación térmica, probabilidad de lluvia, temperatura máxima y mínima. Además, requiero los mismos datos para los próximos tres días. La respuesta debe ser clara y estructurada por día, facilitando la comparación entre ellos.",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    // obtener la latitud y longitud de la ciudad usando la API de Open-Meteo Geocoding

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,visibility,uv_index&timezone=auto`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Weather Error",
            }),
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
});
