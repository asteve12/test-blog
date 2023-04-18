


 //conver file size to mb 
 export const convertFileSizeToMbEquivalent = (fileSize: number) => fileSize / (1024 * 1024);


 //validate file size 
export const validDateFileSize = (file: File): boolean => {
  const max_file_size_allowed_in_mb = 256;
  console.log("fileSize",convertFileSizeToMbEquivalent(file.size))
  const isFileSizeAllowed: boolean = convertFileSizeToMbEquivalent(file.size) <= max_file_size_allowed_in_mb ? true : false;
    return isFileSizeAllowed
    }