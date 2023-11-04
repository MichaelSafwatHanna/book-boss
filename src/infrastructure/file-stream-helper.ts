import type { Response } from 'express';

export const setExcelFileStreamHeaders = (
  response: Response,
  fileName: string,
): void => {
  response.set({
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
  });
};
