import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [AppController, PdfController],
  providers: [AppService, PdfService],
})
export class AppModule {}
