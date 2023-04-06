const PdfkitConstruct = require('pdfkit-construct');



const initPdf = (columns = [], rows = []) => {
    return new Promise((resolve, reject) => {

        const doc = new PdfkitConstruct({
            size: 'A4',
            margins: { top: 20, left: 20, right: 20, bottom: 20 },
        });


        doc.setDocumentHeader({ height: '15%' }, async () => {

            doc.image('src/assets/logo-higea.png', 20, 15, { width: 50 })
                .text('Fundación Higea', 20, 80)
                .text('Dirección de la empresa aqui')
                .text('Teléfono de la empresa')

            doc.fontSize(11)
            doc.font('Helvetica-Bold')
            doc.text('Paciente que más visita la fundación', 20, 120, {
                align: 'center'
            })

        });

        doc.addTable(columns, rows, {
            cellsMaxWidth: 200,
            width: 'fill_body',
            headBackground: '#005CB9',
            headColor: '#FFF'
        })

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