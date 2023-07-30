import { useState } from "react";
import "./App.css";
import PdfForm from "./components/PdfForm";
import Navbar from "./components/Navbar";
import axios from "axios";
import extractFormFields from "./components/extractPdfFields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pdf, setPdf] = useState();
  const [pdfData, setPdfData] = useState([]);

  const handleGetPDF = async () => {
    try {
      // Show a loading toast while fetching the PDF
      toast.info("Fetching PDF...", {
        theme: "dark",
        autoClose: 3000,
      });

      const response = await axios.get("http://localhost:3000/pdf/example", {
        responseType: "blob", // To receive binary data as response
      });

      // Create a blob URL from the response data and open it in a new window
      const pdfUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setPdf(pdfUrl);
      // toast.dismiss(); // Dismiss the loading toast on success
    } catch (error) {
      toast.error("Error fetching PDF.", { theme: "dark", autoClose: 3000 });
      console.log("error", error);
    }
  };

  const handleSetPDF = async () => {
    try {
      // Simulate data to be sent in the POST request (replace with actual data as needed)
      const dataToSend = await extractFormFields(pdf);

      // Show a loading toast while setting the PDF
      toast.info("Setting PDF...", { theme: "dark", autoClose: 3000 });

      // Make the POST request
      const response = await axios.post(
        "http://localhost:3000/pdf/example",
        dataToSend
      );

      // Handle the response if needed (e.g., display a success message)
      toast.success("PDF set successfully!", {
        theme: "dark",
        autoClose: 3000,
      });
      console.log("POST response:", dataToSend);
    } catch (error) {
      toast.error("Error setting PDF.", { theme: "dark", autoClose: 3000 });
      console.log("Error setting PDF.", error);
    }
  };

  return (
    <>
      <Navbar
        pdf={pdf}
        setPdf={setPdf}
        pdfData={pdfData}
        handleGetPDF={handleGetPDF}
        handleSetPDF={handleSetPDF}
      />
      <PdfForm setPdfData={setPdfData} pdf={pdf} />

      {/* Toast container to display notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
