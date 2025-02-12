const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const directoryPath = 'I:/'; // Specify the directory containing the files and subfolders
const chunkSize = 4 * 1024 * 1024; // 4MB in bytes

// Function to calculate hash of the first 4MB of a file
const calculateHash = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath, { start: 0, end: chunkSize - 1 });

    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
};

// Function to check if a file or directory is hidden
const isHidden = (fileName) => {
  return fileName.startsWith('.');
};

// List of system directories to exclude
const systemDirs = ['node_modules', 'System Volume Information', '$RECYCLE.BIN', 'AppData', 'Windows', 'Program Files', 'Program Files (x86)', 'ProgramData', 'found.000', 'found.001', 'found.002', 'found.003'];

let totalFilesDeleted = 0;
let totalStorageFreed = 0;

const findAndDeleteDuplicates = async (dirPath, hashMap = {}) => {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dirPath, file.name);

      if (file.isDirectory()) {
        // Skip system directories and hidden directories
        if (!systemDirs.includes(file.name) && !isHidden(file.name)) {
          // Recursively check subfolders, ignoring errors
          try {
            await findAndDeleteDuplicates(filePath, hashMap = {});
          } catch (err) {
            console.error(`Failed to access directory: ${filePath} - ${err.message}`);
          }
        }
      } else if (file.isFile() && !isHidden(file.name)) {
        const stat = await fs.promises.stat(filePath);
        const fileHash = await calculateHash(filePath);

        if (hashMap[fileHash] && hashMap[fileHash].size === stat.size) {
          // Duplicate found, log original and duplicate file paths with sizes
          console.log(`Original: ${hashMap[fileHash].path} (Size: ${hashMap[fileHash].size} bytes) | Duplicate: ${filePath} (Size: ${stat.size} bytes)`);
          await fs.promises.unlink(filePath);
          totalFilesDeleted += 1;
          totalStorageFreed += stat.size;
          console.log(`Deleted duplicate file: ${file.name}`);
        } else {
          hashMap[fileHash] = { size: stat.size, path: filePath };
        }
      }
    }
    console.log(`Duplicate removal process completed in folder: ${dirPath}`);
  } catch (err) {
    console.error(`Failed to access directory: ${dirPath} - ${err.message}`);
  }
};

const startProcess = async () => {
  await findAndDeleteDuplicates(directoryPath);
  console.log(`Total files deleted: ${totalFilesDeleted}`);
  console.log(`Total storage freed: ${totalStorageFreed} bytes`);
};

startProcess();
