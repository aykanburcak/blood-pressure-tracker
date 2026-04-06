import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

/**
 * Android-first: turns print-safe HTML into a temporary PDF file URI.
 * Caller should remove the file with {@link deletePdfFile} after sharing when possible.
 */
export async function generateBpPdfFromHtml(html: string): Promise<{ uri: string }> {
  const { uri } = await Print.printToFileAsync({ html });
  return { uri };
}

export async function deletePdfFile(uri: string): Promise<void> {
  await FileSystem.deleteAsync(uri, { idempotent: true });
}
