const Navbar = ({ pdf, setPdf, pdfData, handleGetPDF, handleSetPDF }) => {
  return (
    <div className="btnNavbar">
      <div className="btn" onClick={handleGetPDF}>
        Get PDF
      </div>
      <div className="btn" onClick={() => handleSetPDF(pdfData)}>
        Set PDF
      </div>
    </div>
  );
};

export default Navbar;
