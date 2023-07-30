import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import * as pdfParse from 'pdf-parse';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable()
export class PdfService {
  data = [
    {
      name: '61daa6fb-0143-4faa-9243-790262d903f5firstName',
      type: 'Tx',
      value: 'udibaba',
    },
    {
      name: '61daa6fb-0143-4faa-9243-790262d903f5lastName',
      type: 'Tx',
      value: 'lmao',
    },
    {
      name: '61daa6fb-0143-4faa-9243-790262d903f5roles',
      type: 'Ch',
      value: ['Admin'],
    },
    {
      name: '61daa6fb-0143-4faa-9243-790262d903f5time',
      type: 'Btn',
      value: 'parttime',
    },
    {
      name: '61daa6fb-0143-4faa-9243-790262d903f5time',
      type: 'Btn',
      value: 'parttime',
    },
    {
      name: '8a06c958-d66d-4e30-a5b5-41ac3abfdbfcfirstName',
      type: 'Tx',
      value: 'lala',
    },
    {
      name: '8a06c958-d66d-4e30-a5b5-41ac3abfdbfclastName',
      type: 'Tx',
      value: 'off',
    },
    {
      name: '8a06c958-d66d-4e30-a5b5-41ac3abfdbfcroles',
      type: 'Ch',
      value: ['Testing'],
    },
    {
      name: '8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime',
      type: 'Btn',
      value: 'fulltime',
    },
    {
      name: '8a06c958-d66d-4e30-a5b5-41ac3abfdbfctime',
      type: 'Btn',
      value: 'fulltime',
    },
  ];
  async readPdf(filePath: string): Promise<string> {
    const pdfBuffer = readFileSync(filePath);
    const pdfData = await pdfParse(pdfBuffer);
    console.log(pdfData);
    return pdfData.text;
  }

  async extractFormFields(pdfPath: string): Promise<any[]> {
    try {
      const pdfBuffer = readFileSync(pdfPath);
      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      const numPages = pdf.numPages;

      const fields = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const annotations = await page.getAnnotations();

        for (const annotation of annotations) {
          if (annotation.fieldType) {
            fields.push({
              name: annotation.fieldName,
              type: annotation.fieldType,
              value: annotation.fieldValue,
            });
          }
        }
      }

      return fields;
    } catch (error) {
      console.error('Error extracting form fields:', error);
      throw new Error('Failed to extract form fields from PDF.');
    }
  }

  async writePdf(
    filePath: string,
    content: Array<{ name: string; type: string; value: string | string[] }>,
  ): Promise<void> {
    try {
      const pdfBuffer = readFileSync(filePath);
      const pdf = await PDFDocument.load(pdfBuffer); // Load the PDF using pdf-lib
      const formUpdateData = {};

      for (const fieldData of content) {
        const fieldName = fieldData.name;
        const fieldValue = fieldData.value;

        formUpdateData[fieldName] = fieldValue;
      }

      // Update the form field values in the PDF
      const form = pdf.getForm();
      for (const [fieldName, fieldValue] of Object.entries(formUpdateData)) {
        if (fieldName.slice(36) === 'roles') {
          const field = form.getDropdown(fieldName);
          field.select(fieldValue as string);
        } else if (fieldName.slice(36) === 'time') {
          const field = form.getRadioGroup(fieldName);
          field.select(fieldValue as string);
        } else if (
          fieldName.slice(36) === 'firstName' ||
          fieldName.slice(36) === 'lastName'
        ) {
          const field = form.getTextField(fieldName);
          field.setText(fieldValue as string);
        }
      }

      // Save the updated PDF to a buffer
      const updatedPdfBytes = await pdf.save();

      // Write the updated PDF buffer to the original file path
      writeFileSync(filePath, updatedPdfBytes);
    } catch (error) {
      console.error('Error writing PDF:', error);
      throw new Error('Failed to write PDF.');
    }
  }
}
