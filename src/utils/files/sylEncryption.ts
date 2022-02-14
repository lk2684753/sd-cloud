export const checkFileType = (fileName: string) => {
  const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
  let type = '';
  switch (fileType) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'bmp':
    case 'gif':
    case 'webp':
    case 'psd':
    case 'svg':
    case 'tiff':
      type = 'picture';
      break;
    case 'cda':
    case 'wav':
    case 'mp3':
    case 'wmv':
    case 'flac':
    case 'aac':
      type = 'music';
      break;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'rmvb':
    case 'rm':
    case 'flv':
    case '3gp':
      type = 'video';
      break;
    case 'txt':
    case 'xls':
    case 'xlsx':
    case 'doc':
    case 'docx':
    case 'ppt':
    case 'pptx':
    case 'pdf':
    case 'md':
      type = 'document';
      break;
    default:
      type = 'other';
      break;
  }
  return type;
};
