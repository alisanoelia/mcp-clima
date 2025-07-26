# mcp-clima

A basic MCP server to retrieve weather information for any city. This server provides not only the current temperature, but also:

- Wind speed
- Current weather conditions

## Installation

Clone the repository:

```sh
git clone https://github.com/alisanoelia/mcp-clima
```

Build the project:

```sh
npm run build
```

## MCP Client Configuration

To use this server with Claude or any MCP client, configure your MCP client as follows:

```json
"clima": {
    "command": "node",
    "args": [
        "/path/mcp-clima/build/index.js"
    ],
    "env": {
        "OPEN_WEATHER_MAP_KEY": "your-api-key-open-weather"
    }
}
```

Replace `/path/mcp-clima/build/index.js` with the actual path to your build directory, and set your OpenWeatherMap API key in the environment variable `OPEN_WEATHER_MAP_KEY`.

---

For more information or support, please refer to the repository or create an Issue in this repository.
