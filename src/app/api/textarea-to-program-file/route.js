// api/textarea-to-program-file
/**--------------------------------------------
 *         TEXTAREA TO PROGRAM FILE                
 *---------------------------------------------**/
// From front end panel, send c code to file
// for program run

import { NextResponse } from "next/server";
import fs from 'fs/promises'; // Import the promise-based version of the fs module
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'Program/tests/inputs/interface.c');
    // console.log("Writing file from frontend to:", filePath);
    const text = data.text;

    try {
        // Use fs.promises to write file asynchronously
        await fs.writeFile(filePath, text);
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
