export const CERT_LEVELS = [
  { value: "HIGHSCHOOL", label: "High school" },
  { value: "DEGREE", label: "Degree / Diploma" },
  { value: "BSC", label: "BSc" },
  { value: "MSC", label: "MSc" },
  { value: "PHD", label: "PhD" },
  { value: "DOCTORATE", label: "Doctorate" },
];

export const MAX_CV_BYTES = 5 * 1024 * 1024;

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}
