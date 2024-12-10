export async function handleFileUpload(file: File): Promise<string> {
    // In a real application, you would upload the file to your server or cloud storage
    // For now, we'll create a local URL for preview
    return URL.createObjectURL(file)
  }
  
  export function isImageFile(file: File) {
    return file.type.startsWith('image/')
  }
  
  