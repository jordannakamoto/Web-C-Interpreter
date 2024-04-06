// api/textarea-to-program-file
/**--------------------------------------------
 *         TEXTAREA TO PROGRAM FILE                
 *---------------------------------------------**/
// From front end panel, send c code to file
// for program run

import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    const data = await request.json()
    const filePath = path.join(process.cwd(),'Program/tests/inputs/interface.c');
    console.log("writing file from frontend to:", filePath);

    const text = data.text;

    // console.log(text);

    try {
      fs.writeFileSync(filePath, text);
      // File write was successful
      return NextResponse.json({
          message: "Frontend to program file interface.c written successfully",
          filePath: filePath,
      }, { status: 200 });
  } catch (err) {
      console.error('Error writing to file:', err);
      // File write failed
      return NextResponse.json({
          error: "Failed to write file from frontend"
      }, { status: 500 });
  }
}