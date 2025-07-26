import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

const server = new McpServer({
  name: "Clima",
  version: "0.2.0",
});

server.tool(
  "getWeather",
  "Get weather information for a city",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    try {
      const apikey = process.env.OPEN_WEATHER_MAP_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},co&appid=${apikey}&units=metric&lang=es`;

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
