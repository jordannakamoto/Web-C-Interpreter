import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'

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

  // Read files asynchronously and return their contents in a promise
  const readFileContents = () => {
    const readOperations = files.map(filename => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(basePath, filename);
        fs.readFile(filePath, 'utf8', (err, content) => {
          if (err) {
            console.error(`Error reading file ${filename}:`, err);
            reject(new Error(`Error reading file ${filename}`)); // Reject the promise on error
          } else {
            resolve({ [filename]: content }); // Resolve each file's content as an object
          }
        });
      });
    });
  
    return Promise.all(readOperations)
      .then(results => {
        // Combine all results into a single object
        return results.reduce((acc, result) => ({ ...acc, ...result }), {});
      });
  };

  try {
    // Await the reading of file contents
    const fileContents = await readFileContents();

    // Return the file contents
    return NextResponse.json({
      message: "Files retrieved from back end successfully",
      files: fileContents
    }, { status: 200 });

  } catch (error) {
    // Handle any errors that occur during the file reading process
    return NextResponse.json({
      message: "An error occurred while retrieving files",
      error: error.message
    }, { status: 500 });
  }
}
