import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import "react-pdf/dist/esm/Page/TextLayer.css";

const LocalPdfViewer = ({ pdf }) => {
  
  return (
    <div>
      <h1>Local PDF Viewer</h1>
      {/* <PdfViewer pdfUrl={pdf} /> */}
      {/* <object data={pdf} width="900" height="650"></object> */}
      <Document file={pdf} onLoadSuccess={console.log}>
        <Page pageNumber={1} renderForms />
      </Document>
    </div>
  );
};

export default LocalPdfViewer;
