export const AllowedTypes = {
  PNG: 'image/png',
  JPG: 'image/jpeg',
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  PPT: 'application/vnd.ms-powerpoint',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
} as const;

export const AllowedTypesValues = Object.values(AllowedTypes) as [
  string,
  ...string[],
];
