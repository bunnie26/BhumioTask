// pdf.controller.ts

import { Controller, Get, Param, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import * as path from 'path';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':filename')
  async readPdf(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const filePath = path.resolve('src/example.pdf');
    res.sendFile(filePath);
  }

  @Post(':filename')
  async writePdf(
    @Param('filename') filename: string,
    @Body()
    body: Array<{ name: string; type: string; value: string | string[] }>,
  ): Promise<void> {
    const filePath = path.resolve(`src/${filename}.pdf`);
    console.log(body);
    await this.pdfService.writePdf(filePath, body);
  }
}
