const PdfkitConstruct = require('pdfkit-construct');



const initPdf = (columns = [], rows = [], title = new String()) => {
    return new Promise((resolve, reject) => {

        const doc = new PdfkitConstruct({
            size: 'A3',
            margins: { top: 20, left: 20, right: 20, bottom: 20 },
        });


        doc.setDocumentHeader({ height: '15%' }, async () => {

            doc.image('src/assets/logo-higea.png', 20, 15, { width: 50 })
                .text('Fundación Higea', 20, 80)
                .text('Av. Vargas con Carrera 31, Edif. Badan Lara,')
                .text('Teléfono: (251) 250.43.70')

            doc.fontSize(11)
            doc.font('Helvetica-Bold')
            doc.text(title, 20, 120, {
                align: 'center'
            })

        });


        if (rows.length > 0) {
            doc.addTable(columns, rows, {
                cellsMaxWidth: 200,
                width: 'fill_body',
                headBackground: '#005CB9',
                headColor: '#FFF'
            })

        }


        const chunks = [];

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });
        doc.on('end', () => {
            const pdfBytes = Buffer.concat(chunks);
            resolve(pdfBytes)
        });
        doc.render()
        doc.end();
    })
}

module.exports = initPdf