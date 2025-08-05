# mcp-clima

> [!NOTE]
> No API KEY

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
}
```

Replace `/path/mcp-clima/build/index.js` with the actual path to your build directory.

---

For more information or support, please refer to the repository or create an Issue in this repository.

## Thanks

[Open-Meteo](https;//open-meteo.com)
