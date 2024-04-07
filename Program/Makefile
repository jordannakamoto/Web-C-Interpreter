CFLAGS = -g -Wall -std=c++20
CXX = g++
OBJDIR = obj

# Object files
OBJS = $(OBJDIR)/main.o $(OBJDIR)/FileHandler.o $(OBJDIR)/CommentRemover.o $(OBJDIR)/Token.o $(OBJDIR)/TokenList.o $(OBJDIR)/Tokenizer.o $(OBJDIR)/ConcreteSyntaxTree.o $(OBJDIR)/RecursiveDescentParser.o $(OBJDIR)/IdentifierClassifier.o $(OBJDIR)/SymbolTable.o $(OBJDIR)/ErrorHandler.o 

# Target executable name
TARGET = app

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CFLAGS) $(OBJS) -o $(TARGET)

$(OBJDIR)/main.o: main.cpp $(OBJDIR)/FileHandler.o $(OBJDIR)/CommentRemover.o $(OBJDIR)/Token.o $(OBJDIR)/TokenList.o $(OBJDIR)/Tokenizer.o $(OBJDIR)/ConcreteSyntaxTree.o $(OBJDIR)/RecursiveDescentParser.o $(OBJDIR)/SymbolTable.o $(OBJDIR)/ErrorHandler.o 
	$(CXX) $(CFLAGS) -c main.cpp -o $(OBJDIR)/main.o

$(OBJDIR)/FileHandler.o: FileHandler.cpp $(OBJDIR)/CommentRemover.o
	$(CXX) $(CFLAGS) -c FileHandler.cpp -o $(OBJDIR)/FileHandler.o

$(OBJDIR)/CommentRemover.o: CommentRemover.cpp
	$(CXX) $(CFLAGS) -c CommentRemover.cpp -o $(OBJDIR)/CommentRemover.o

$(OBJDIR)/Token.o: Token.cpp
	$(CXX) $(CFLAGS) -c Token.cpp -o $(OBJDIR)/Token.o

$(OBJDIR)/TokenList.o: TokenList.cpp
	$(CXX) $(CFLAGS) -c TokenList.cpp -o $(OBJDIR)/TokenList.o

$(OBJDIR)/Tokenizer.o: Tokenizer.cpp
	$(CXX) $(CFLAGS) -c Tokenizer.cpp -o $(OBJDIR)/Tokenizer.o

$(OBJDIR)/ConcreteSyntaxTree.o: ConcreteSyntaxTree.cpp
	$(CXX) $(CFLAGS) -c ConcreteSyntaxTree.cpp -o $(OBJDIR)/ConcreteSyntaxTree.o

$(OBJDIR)/RecursiveDescentParser.o: RecursiveDescentParser.cpp
	$(CXX) $(CFLAGS) -c RecursiveDescentParser.cpp -o $(OBJDIR)/RecursiveDescentParser.o

$(OBJDIR)/IdentifierClassifier.o: IdentifierClassifier.cpp
	$(CXX) $(CFLAGS) -c IdentifierClassifier.cpp -o $(OBJDIR)/IdentifierClassifier.o

$(OBJDIR)/SymbolTable.o: SymbolTable.cpp
	$(CXX) $(CFLAGS) -c SymbolTable.cpp -o $(OBJDIR)/SymbolTable.o

$(OBJDIR)/ErrorHandler.o: ErrorHandler.cpp
	$(CXX) $(CFLAGS) -c ErrorHandler.cpp -o $(OBJDIR)/ErrorHandler.o


clean:
	rm -rf $(OBJDIR)/*.o $(TARGET)
