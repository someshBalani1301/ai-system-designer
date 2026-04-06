/**
 * Header component with input and generate button
 */

export function Header({ prompt, onPromptChange, onGenerate, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onGenerate();
    }
  };

  return (
    <header className="app-header">
      <div className="app-header-left">
        <h1>🚀 System Flow Designer</h1>
      </div>

      <div className="app-header-right">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Design your system (e.g., Netflix with user service, recommendation engine, CDN, and database)..."
          disabled={loading}
          aria-label="System design prompt input"
          className="prompt-input"
          rows={3}
        />
        <button
          className="generate-btn"
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          aria-label={loading ? "Generating design" : "Generate system design"}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </header>
  );
}
