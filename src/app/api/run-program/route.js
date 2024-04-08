// api/run-program
/**--------------------------------------------
 *         RUN PROGRAM                
 *---------------------------------------------**/
// Assuming interface.c has some code to interpret...
// Run program

import { NextResponse } from "next/server";
import { exec } from 'child_process';
import path from 'path';

export const dynamic = 'force-dynamic'

export async function GET(request) {
    const programPath = path.join(process.cwd(),'Program');
    const command = `./app tests/inputs/interface.c`;
    console.log("Running program!");

    console.log(programPath);

    // Run the compiled program
    try {
        const { stdout, stderr } = await new Promise((resolve, reject) => {
            exec(command, { cwd: programPath }, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error running the program:', error);
                    reject({ error, stderr });
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });

        // Handle the output of the program
        console.log('Program ran successfully');
        return NextResponse.json({
            message: "Program ran successfully",
            output: stdout,
            errors: stderr
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to run the program",
            details: error.stderr || error.error.toString()
        }, { status: 500 });
    }
    
}
