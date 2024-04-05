// FileHandler
/* Manages file input/output. Produces a file output for each stage of the Interpreter. */

#include <fstream>
#include <iostream>
#include <vector>
#include "FileHandler.h"

// Constructor
FileHandler::FileHandler() {
    lineNumber = 1;
}

// ASSIGNMENT 1: Comment Removal --------------------------------------------------------------------- //

// openFile
void FileHandler::openFile(const std::string& filename) {
        fileStream.open(filename, std::ios::binary);
        if (!fileStream.is_open()) {
            std::cerr << "Error opening file: " << filename << "\n";
        }
        fileName = filename;
    }

// printInitialFile - reads and prints Original file stream then resets its position back to where it was before
// should be called before the start of main program procedures
void FileHandler::printInitialFile() {
        if (!fileStream) {
            std::cerr << "Stream is not open." << std::endl;
            return;
        }
        std::streampos originalPosition = fileStream.tellg(); // Save the original position of the file stream
        fileStream.seekg(0, std::ios::beg);                   // Reset to the start of the file
        std::string line;                                    // Read and print the file contents
        while (getline(fileStream, line)) {
            lineNumber++;
            std::cout << line << std::endl;
        }
        fileStream.clear();                                   // Restore the file stream's position and state
        fileStream.seekg(originalPosition);
        std::streampos newPosition = fileStream.tellg();      // Confirm the restoration
        if (newPosition != originalPosition) {
            std::cerr << "Failed to restore the stream position." << std::endl;
        }
}

// outputWithoutCommentsToFile - to be called by main after Procedure 1
// Writes the fileContent string to a file with the same name as the input file, but with "-comments_removed_output_file" appended to the end.
void FileHandler::outputWithoutCommentsToFile(CommentRemover cr) {
    std::string outputName = generateOutputFileName("comments_removed_output_file");
    std::ofstream outputFile(outputName); // Open File

    if (outputFile.is_open()) {
        outputFile << cr.result; // Write the string to the file
        outputFile.close();
        std::cout << "String has been written to " << outputName << " successfully." << std::endl;
    } else {
        std::cerr << "Unable to open " << outputName << " for writing." << std::endl;
    }
}
// ASSIGNMENT 2: Tokenizer ------------------------------------------------------------------------------- //

// outputTokenListToFile - to be called by main after Procedure 2
// Writes the linked list to a file with the same name as the input file, but with "-output_file.txt" appended to the end.
void FileHandler::outputTokenListToFile(TokenList* list) {
    std::string outputName = generateOutputFileName("tokenlist_output_file");
    std::ofstream outputFile(outputName); // Open File
    TokenList::Node* temp;
    temp = list->head;
    if (outputFile.is_open()) {
        while(temp != nullptr) {
            outputFile << "Token type: " << temp->getToken()->getTokenTypeString() << "\n";
            outputFile << "Token:      " << temp->getToken()->getTokenValue() << "\n";
            temp=temp->getNext();
            outputFile << "\n";
        }
        outputFile << "\n";
        outputFile.close();
        std::cout << "String has been written to " << outputName << " successfully." << std::endl;
    } else {
        std::cerr << "Unable to open " << outputName << " for writing." << std::endl;
    }
}
// ASSIGNMENT 3: CST Recursive Descent ----------------------------------------------------------------------- //

void FileHandler::outputCSTToFile(ConcreteSyntaxTree* tree) {
    std::string outputName = generateOutputFileName("cst_output_file");
    std::ofstream outputFile(outputName); // Open File

    if (!outputFile.is_open()) {
        std::cerr << "Unable to open " << outputName << " for writing." << std::endl;
        return;
    }
    ConcreteSyntaxTree::Node* current = tree->head;
    while ( current != nullptr ) {
        // Skip and move to the next sibling or child if the current node is an escape character
        if (current->getToken()->getTokenType() == tdfa::ESCAPE_CHARACTER) {
            current = current->getNextSibling() ? current->getNextSibling() : current->getNextChild(); // Assume escape characters don't terminate a line...
            continue; // Continue to the next iteration without printing
        }

        // Print current node's token value
        outputFile << current->getToken()->getTokenValue();

        if (current->getNextSibling() != nullptr) {
            outputFile << " "; // Add a space if there is a next sibling
            current = current->getNextSibling();
        } else {
            outputFile << "\n"; // Indicate moving down a level with a newline
            current = current->getNextChild();
        }
    };
    outputFile.close();
    std::cout << "String has been written to " << outputName << " successfully." << std::endl;
}

// ASSIGNMENT 4: Symbol Table -------------------------------------------------------------------------------- //
void FileHandler::outputSymbolTableToFile(SymbolTable* st) {
    std::string outputName = generateOutputFileName("symboltable_output_file");
    std::ofstream outputFile(outputName); // Open File

    if(outputFile.is_open()) {
        auto oldBuf = std::cout.rdbuf();
        std::cout.rdbuf(outputFile.rdbuf());
        st->printTable();
        std::cout.rdbuf(oldBuf);
        outputFile.close();
    }
}
// ----------------------------------------------------------------------------------------------------------- //

// generateOutputFileName()
// returns a string with the proper output file path + name
// ex. "inputs/test1.c" -> "program-outputs/test1-output_file.txt"
std::string FileHandler::generateOutputFileName(std::string descriptor){
    size_t lastIndex = fileName.find_last_of(".");
    std::string outputName = fileName.substr(0, lastIndex);

    // Change path to new output directory
    std::string toSearch = "inputs";
    std::string replaceWith = "program-outputs";
    size_t pos = outputName.find(toSearch);
    if (pos != std::string::npos) { // if "inputs" is found
        outputName.replace(pos, toSearch.length(), replaceWith);
    }
    std::cout << outputName << std::endl;

    outputName += "-" + descriptor + ".txt";
    return outputName;
}

// Getters
std::string FileHandler::getFileName(){
    return fileName;
};