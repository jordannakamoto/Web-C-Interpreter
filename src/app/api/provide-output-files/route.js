// api/provide-output-files
/**--------------------------------------------
 *         RUN PROGRAM                
 *---------------------------------------------**/
// After program run, provide output files to the frontend

import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  // Define the base path for output files
  const basePath = path.join(process.cwd(), 'Program/tests/program-outputs');
  
  // Filenames
  const files = [
    'interface-comments_removed_output_file.txt',
    'interface-cst_output_file.txt',
    'interface-symboltable_output_file.txt',
    'interface-tokenlist_output_file.txt',
  ];

  // Object to hold file contents
  const fileContents = {};

  // Read each file and add its content to the fileContents object
  files.forEach((filename) => {
    const filePath = path.join(basePath, filename);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      fileContents[filename] = content;
    } catch (err) {
      console.error(`Error reading file ${filename}:`, err);
      fileContents[filename] = "Error reading file";
    }
  });
  // Return the file contents
  return NextResponse.json({
    message: "Files retrieved from back end successfully",
    files: fileContents
}, { status: 200 });
}
