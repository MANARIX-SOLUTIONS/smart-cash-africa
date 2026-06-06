import type { Transaction } from '@/types/finance';

export function downloadTransactionsCsv(
  transactions: Transaction[],
  filename = 'smartcash-transactions.csv',
  headers = ['Date', 'Description', 'Category', 'Account', 'Amount', 'Status'],
) {
  const rows = transactions.map((tx) => [
    tx.date,
    tx.description,
    tx.category,
    tx.account,
    String(tx.amount),
    tx.status,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadReportFile(
  reportName: string,
  format: string,
  content: string,
) {
  const ext = format.toLowerCase() === 'excel' ? 'xlsx' : format.toLowerCase();
  const mime =
    ext === 'pdf'
      ? 'application/pdf'
      : ext === 'csv'
        ? 'text/csv'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${reportName.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
  link.click();
  URL.revokeObjectURL(url);
}
