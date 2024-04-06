// api/run-program
/**--------------------------------------------
 *         RUN PROGRAM                
 *---------------------------------------------**/
// Assuming interface.c has some code to interpret...
// Run program

import { NextResponse } from "next/server";
import { exec } from 'child_process';
import path from 'path';

export async function GET(request) {
    const programPath = path.join(process.cwd(),'Program/');
    console.log("Running program!");

     // Run the compiled program
     exec(`${programPath}app /tests/inputs/interface.c`, (runError, stdout, stderr) => {
        if (runError) {
            console.error('Error running the program:', runError);
            return NextResponse.json({ error: "Failed to run the program" }, { status: 500 });
        }

    // Handle the output of the program
    console.log('Program output:', stdout);
    return NextResponse.json({
        message: "Program ran successfully",
        output: stdout,
    }, { status: 200 });
    });
}
