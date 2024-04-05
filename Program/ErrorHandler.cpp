#include "ErrorHandler.h"

// Assignment 3 ---------------------------------------------------------------- //
// Assignment 3, exit on bad variable naming

void ErrorHandler::exitNegativeArray(int lineNumber)
{
    std::string message = "Syntax error on line " + std::to_string(lineNumber) + ": array declaration size must be a positive integer.";
    std::cerr << message << std::endl;
    exit(12);
}

void ErrorHandler::exitUnterminatedStr(int lineNumber)
{
    std::string message = "Syntax error on line " + std::to_string(lineNumber) + ": unterminated string quote.";
    std::cerr << message << std::endl;
    exit(12);
}

// Assignment 3: If a reserved word attempted to be used as a name 
// for a variable, procedure, function
void ErrorHandler::exitVarName(int lineNumber, const std::string &tokenValue)
{
    std::string message = "Syntax error in line " + std::to_string(lineNumber) + ": reserved word \"" + tokenValue + "\" cannot be used for the name of a variable.";
    std::cerr << message << std::endl;
    exit(12);
}

void ErrorHandler::exitProcName(int lineNumber, const std::string &tokenValue)
{
    std::string message = "Syntax error in line " + std::to_string(lineNumber) + ": reserved word \"" + tokenValue + "\" cannot be used for the name of a procedure.";
    std::cerr << message << std::endl;
    exit(12);
}

void ErrorHandler::exitFuncName(int lineNumber, const std::string &tokenValue)
{
    std::string message = "Syntax error in line " + std::to_string(lineNumber) + ": reserved word \"" + tokenValue + "\" cannot be used for the name of a function.";
    std::cerr << message << std::endl;
    exit(12);
}

// Assignment 3 Parsing BNF: Token Type validation
// If the name of the procedure is not an IDENTIFIER type, throw error
void ErrorHandler::exitProcType(int lineNumber, tdfa::Token_Type tokenType)
{
    std::string message = "Syntax error in line " + std::to_string(lineNumber) + ": token of type " + Token::tokenTypeToString(tokenType) + " cannot be used for the name of a procedure.";
}

// If the name of the function is not an IDENTIFIER type, throw error
void ErrorHandler::exitFuncType(int lineNumber, tdfa::Token_Type tokenType)
{
    std::string message = "Syntax error in line " + std::to_string(lineNumber) + ": token of type " + Token::tokenTypeToString(tokenType) + " cannot be used for the name of a function.";
}

// Exit on statement evaluation
void ErrorHandler::exitStatementSyntaxType(int lineNumber, std::string statementType, Token_Type expectedType, Token_Type actualType)
{
    std::string message = "Syntax Error in statement in line " + std::to_string(lineNumber) + " of type: " + statementType + ". Expected token_type: " + Token::tokenTypeToString(expectedType) + " , got: " + Token::tokenTypeToString(actualType);
}

void ErrorHandler::exitStatementSyntaxValue(int lineNumber, std::string statementType, std::string expectedValue, std::string actualValue)
{
    std::string message = "Syntax Error in statement in line " + std::to_string(lineNumber) + " of type: " + statementType + ". Expected token_value: " + expectedValue + " , got: " + actualValue;
}

void ErrorHandler::exitStatementIncomplete(int lineNumber, std::string statementType)
{
    std::string message = "Incomplete statement in line " + std::to_string(lineNumber) + " of type: " + statementType;
}

// End Assignment 3 ------------------------------------------------------------ //


// Generic Functions... Add Error / Print
void ErrorHandler::addError(int lineNumber, const std::string &message, int severity)
{
    errors.emplace_back(lineNumber, message, severity);
}
bool ErrorHandler::hasErrors()
{
    return !errors.empty();
}
void ErrorHandler::printErrors()
{
    for (const auto &error : errors)
    {
        if (error.severity > 0)
        {
            std::cerr << error.message << std::endl;
        }
    }
}
void ErrorHandler::clearErrors()
{
    errors.clear();
}
const ErrorHandler::Error& ErrorHandler::getLastError()
{
    // Return a reference to the last error
    return errors.back();
}

void ErrorHandler::outputErrorToFile(std::string errorMessage) {
    std::cout << "test";
    std::string outputName = generateOutputFileName();
    std::ofstream outputFile(outputName); // Open File

    if(outputFile.is_open()) {
        outputFile << errorMessage << "\n";
        outputFile.close();
    }
}

// setProgramOutputFile()
// returns a string with the proper output file path + name
// ex. "inputs/test1.c" -> "program-outputs/test1-output_file.txt"
std::string ErrorHandler::generateOutputFileName(){
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

    outputName += "-output_file.txt";
    return outputName;
}