# Local File Converter

A privacy-focused file conversion tool that runs entirely in your browser. No uploads, no server-side processing - your files never leave your device.

## Features

- Privacy-first: All file conversions happen locally in your browser
- Secure: Files never uploaded to any server
- Fast: Utilizes WebAssembly for high-performance file conversions
- Simple: Clean, intuitive user interface

## Supported Conversions (MVP)

- PDF → DOCX
- DOCX → PDF
- JPG → PNG
- PNG → JPG
- HEIC → JPG
- JPG → PDF
- PNG → PDF
- MP4 → MP3
- PDF → JPG
- MOV → MP4
- MP4 → GIF

## Technical Details

- Built with React + TypeScript
- Uses WebAssembly for high-performance file conversion
- Web Workers for non-blocking UI during conversion tasks
- 100% client-side processing

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
/
├── docs/             # Project documentation
├── tasks/            # Task definitions, scripts
├── src/              # Source code (React components, JS logic, WASM interfaces)
│   ├── components/   # UI Components
│   ├── workers/      # Web Worker scripts
│   ├── wasm/         # WASM modules/interfaces
│   └── ...
├── public/           # Static assets
├── test/             # Unit and integration tests
├── utils/            # Utility functions
├── config/           # Configuration files
├── data/             # Sample data, fixtures (if any)
├── .cursor/          # Cursor rules
├── README.md         # This file
├── package.json
└── ...               # Build config (vite.config.js or webpack.config.js), etc.
```

## Contributing

*(Contribution guidelines to be added)*

## License

*(License information to be added)* 