import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function MyPDF() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="https://firebasestorage.googleapis.com/v0/b/edike-storage.appspot.com/o/Ariri%20-%20Theresa%20-%201674215100511?alt=media&token=5dc4a881-6c1d-4cdb-877d-7da0686bf19c" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default MyPDF;