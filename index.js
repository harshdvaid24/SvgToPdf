const express = require('express');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const {JSDOM} = require('jsdom');
const app = express();
app.use(express.json({limit: '10mb'}));

app.post('/generate-pdf', (req, res) => {
    try {
        const svgString = req.body.svg;
        if (!svgString) return res.status(400).send('SVG string is required');

        // Optional: Validate SVG with jsdom
        const dom = new JSDOM(`<!DOCTYPE html><body>${svgString}</body>`);
        const svgElement = dom.window.document.querySelector('svg');
        if (!svgElement) throw new Error('Invalid SVG: No SVG element found');

        // Create a new PDF document with PDFKit
        const doc = new PDFDocument(); // Match SVG size
        res.set('Content-Type', 'application/pdf');

        // Pipe the PDF directly to the response
        doc.pipe(res);

        // Render SVG into the PDF at position (0,0)
        SVGtoPDF(doc, svgString, 0, 0); // Match SVG size

        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send(`Error generating PDF: ${error.message}`);
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));