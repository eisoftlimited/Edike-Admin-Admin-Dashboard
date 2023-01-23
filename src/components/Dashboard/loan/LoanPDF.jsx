import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function MyPDF({pdfLink}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      {/* <Document file={{
        url: pdfLink
      }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height={600} pageNumber={pageNumber} />
      </Document> */}
      <p>
        {/* Page {pageNumber} of {numPages} */}
      </p>
      <p><a href={pdfLink} target={'_blank'} rel='noreferrer noopener'>Bank pdf</a></p>
    </>
  );
}

export default MyPDF;