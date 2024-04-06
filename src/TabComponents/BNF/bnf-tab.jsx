const BNF = 

export default function AboutTab() {
    const baseStyle = {
        padding: '20px'
      };
    const headerStyle = {
        fontWeight: '600'
    }
    return (
        <div style={baseStyle}>
            <h2 style={headerStyle}>An Interpreter for a Simple C-Like Language</h2>
            <p>Brayan, Nick, Jordan, Jacob</p>
            <ViewOnGitHubButton />
            <p>Written in C++</p>
        </div>
    );
}
