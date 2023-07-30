import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default async function extractFormFields() {
  const radioButtonsHash = {
    pdfjs_internal_id_19R: "parttime",
    pdfjs_internal_id_24R: "fulltime",
    pdfjs_internal_id_39R: "parttime",
    pdfjs_internal_id_44R: "fulltime",
  };
  const radioBtnData = [
    ...document.querySelectorAll(".radioButton input:checked"),
  ].map((el) => {
    return [el.name, radioButtonsHash[el.id]];
  });

  const fieldTypeHash = {
    text: "Tx",
    "select-one": "Ch",
    radio: "Btn",
  };

  const Data = [
    ...document.querySelectorAll(
      ".textWidgetAnnotation input,.choiceWidgetAnnotation select,.radioButton input"
    ),
  ].map((el) => {
    return [el.name, el.id, el.type, el.value];
  });

  // Update the formData with the values from radioBtnData
  let formData = Data.map((el) => {
    const type = fieldTypeHash[el[2]] || el[2];
    const radioValue = radioBtnData.find((radioData) => radioData[0] === el[0]);
    const value = radioValue ? radioValue[1] : el[3];
    return { name: el[0], type, value };
  });

  return formData;
}
