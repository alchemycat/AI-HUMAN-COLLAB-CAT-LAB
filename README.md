# AI-Human Collaborationoratory

**🔧 Template Repository for AI-Human Collaboration Documentation**

This repository serves as a **template system** for creating beautiful static documentation sites from AI-human collaborative development projects. It transforms comprehensive project retrospectives into professional, searchable documentation websites.

## 📖 What This Repository Provides

- ✅ **Documentation Template**: Reusable structure for AI-human collaboration retrospectives  
- ✅ **Static Site Generator**: MkDocs with Material theme for professional presentation
- ✅ **Example Project**: Project 001 demonstrates comprehensive documentation standards
- ✅ **Template Guide**: See [CLAUDE.md](CLAUDE.md) for complete usage instructions

**Source Attribution**: Project 001 documentation extracted from [`uniserv-nft-erc721`](https://github.com/alchemycat/uniserv-nft-erc721)

## 🚀 Live Documentation Site

Visit the live documentation: **[AI-Human Collaboration](https://alchemycat.github.io/AI-HUMAN-COLLAB-CAT-LAB/)**

## 📁 Projects

### [Project 001: Uniserv NFT Carbon Credit System](001-uniserv-nft-carbon-credit/)
**Duration**: May 30 - June 10, 2025 (11 days)  
**Type**: Multi-chain NFT system development  
**Outcome**: Production-ready carbon credit tokenization platform

**Key Achievements**:
- 181 commits across 13+ intensive sessions
- Multi-chain deployment (Sichang, JBC) with deterministic addresses
- 90% performance improvement through Multicall3 optimization
- 6 production frontend interfaces
- 37,396 words of comprehensive documentation

**Documentation**: [Complete retrospective](001-uniserv-nft-carbon-credit/INDEX.md) with honest AI-human collaboration insights

---

## 🛠️ Development Setup

This repository uses **MkDocs** with **Material theme** to generate beautiful static documentation sites.

### Prerequisites
- Python 3.10+
- [uv](https://github.com/astral-sh/uv) package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB.git
cd AI-HUMAN-COLLAB-CAT-LAB

# Install dependencies with uv
uv sync

# Serve documentation locally (available at http://localhost:8000)
uv run mkdocs serve

# Build static site for deployment
uv run mkdocs build

# Deploy to GitHub Pages
uv run mkdocs gh-deploy
```

### Adding New Projects

1. Create new directory: `00X-project-name/`
2. Add project documentation using the established structure:
   ```
   00X-project-name/
   ├── INDEX.md
   ├── PROJECT_OVERVIEW.md
   ├── README.md
   ├── diary/
   ├── analysis/
   ├── reports/
   └── blog/
   ```
3. Update `mkdocs.yml` navigation section
4. Deploy: `uv run mkdocs gh-deploy`

## 📊 Repository Stats

- **Total Projects**: 1 (more coming!)
- **Documentation Words**: 37,396+
- **Session Documents**: 41+
- **Commits Analyzed**: 181+
- **Collaboration Insights**: Comprehensive

## 🎯 Template System Purpose

This template repository enables:

1. **Documentation Standardization** - Consistent structure for AI-human collaboration retrospectives
2. **Knowledge Preservation** - Complete project histories with honest AI perspectives
3. **Reusable Architecture** - Template for future projects (002-xxx, 003-xxx, etc.)
4. **Professional Presentation** - Beautiful static sites with search and navigation

## 🚀 Quick Start for Template Users

```bash
# Clone this template repository
git clone https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB.git
cd AI-HUMAN-COLLAB-CAT-LAB

# Install dependencies
uv sync

# Review template guide
cat CLAUDE.md

# Serve documentation site locally
uv run mkdocs serve

# Deploy to GitHub Pages
uv run mkdocs gh-deploy
```

**📘 Complete Template Guide**: See [CLAUDE.md](CLAUDE.md) for detailed usage instructions, project structure, and customization options.

## 🔗 Links

- **Live Site**: [AI-Human Collaboration](https://alchemycat.github.io/AI-HUMAN-COLLAB-CAT-LAB/)
- **Source Repository**: [GitHub](https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB)
- **Project 001 Deep Dive**: [Uniserv NFT Retrospective](001-uniserv-nft-carbon-credit/INDEX.md)

---

*Each project in this laboratory provides unfiltered insights into AI-human collaboration patterns, technical challenges, and innovative solutions developed through intensive partnership between artificial intelligence and human creativity.*