# SVG to PDF Generator

A simple Node.js server that converts SVG strings to PDF files using Express, PDFKit, and SVG-to-PDFKit. This application accepts SVG data via a POST request and returns a downloadable PDF containing the rendered SVG.

## Features

- Accepts SVG strings via a JSON POST request.
- Validates SVG input using JSDOM.
- Generates PDFs with PDFKit and renders SVGs using SVG-to-PDFKit.
- Streams the PDF directly to the client as a response.
- Lightweight and easy to deploy.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone or Download the Repository**

   ```bash
   git clone <repository-url>
   cd svg-to-pdf-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Running the Application

1. **Start the Server**

   ```bash
   npm start
   ```

2. **Send a POST Request**
   Use a tool like [Postman](https://www.postman.com/) or `curl` to send a POST request to the server:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"svg": "<svg>Your SVG content here</svg>"}' http://localhost:3000/generate-pdf -o output.pdf
   ```

   This will save the generated PDF as `output.pdf` in your current directory.
