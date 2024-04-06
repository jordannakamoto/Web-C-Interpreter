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

    console.log(text);

    fs.writeFile(filePath, text, (err) => {
        if (err){
            console.error('Error writing to file:', err);
            return NextResponse.json(
                { error: "Failed to write file frontend" },
                { status: 500 }
                );
        }
        return NextResponse.json(
            {
                message: "Frontend to program file interface.c written successfully",
                filePath: filePath,
            },
            { status: 200 }
            );
    });

    return NextResponse.json(
      { error: "Failed to write file from frontend" },
      { status: 500 }
      );
}