import { Parser } from 'json2csv';
import { Response } from 'express';

interface CsvField {
  label: string;
  value: string;
}

export const downloadResource = (
  res: Response,
  fileName: string,
  fields: CsvField[],
  data: any[]
): Response => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
};
