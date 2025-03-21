const express = require('express');
const {jsPDF} = require('jspdf');
const svg2pdf = require('svg2pdf.js');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({limit: '10mb'})); // Adjust limit as needed for SVG size

// Endpoint to generate PDF from SVG
app.post('/generate-pdf', (req, res) => {
    try {
        const svgString = req.body.svg;
        if (!svgString) {
            return res.status(400).send('SVG string is required in the request body');
        }

        const doc = new jsPDF();
        svg2pdf(svgString, doc, {x: 0, y: 0});
        const pdfBuffer = doc.output('arraybuffer'); // Use 'arraybuffer' for binary data
        res.set('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBuffer)); // Send as Buffer for proper binary handling
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});