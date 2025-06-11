# CLAUDE.md - AI-Human Collaboration Documentation Template

## Purpose

This repository serves as a **template system** for creating beautiful static documentation sites from AI-human collaborative development projects. It transforms comprehensive project retrospectives into professional, searchable documentation websites using Docusaurus with internationalization support.

## What This Repository Is

**AI-Human Collaborationoratory** is a documentation template generator that:

- ✅ **Converts** comprehensive markdown documentation into beautiful static sites
- ✅ **Preserves** complete AI-human collaboration histories and insights  
- ✅ **Provides** reusable structure for future projects (002-xxx, 003-xxx, etc.)
- ✅ **Separates** template functionality from visitor content presentation
- ✅ **Maintains** professional documentation standards with cross-references and navigation

## Source Project Attribution

**Project 001** documentation originates from: [`https://github.com/alchemycat/uniserv-nft-erc721`](https://github.com/alchemycat/uniserv-nft-erc721)

This comprehensive retrospective (37,396+ words across 12 core documents) serves as the foundation example, demonstrating how to document:
- Honest AI perspectives on human collaboration
- Session-by-session development reality  
- Technical evolution and architecture decisions
- Communication patterns that worked and failed
- Complete project timelines and achievements

## Template System Architecture

### Directory Structure Template
```
00X-project-name/
├── INDEX.md                    # Central navigation hub
├── PROJECT_OVERVIEW.md         # Project summary and achievements
├── README.md                   # Repository structure guide
├── diary/                      # Personal AI reflections
│   ├── HONEST_REFLECTION.md
│   ├── SESSION_BY_SESSION_REALITY.md
│   ├── COLLABORATION_INSIGHTS.md
│   ├── TECHNICAL_EVOLUTION.md
│   └── DEVELOPMENT_TIMELINE.md
├── analysis/                   # Problem-solving documentation
│   ├── CHALLENGES_AND_SOLUTIONS.md
│   └── COLLABORATION_FAILURE_POINTS.md
├── reports/                    # Executive summaries
│   ├── PROJECT_FINAL_REPORT.md
│   ├── TECHNICAL_ACHIEVEMENTS.md
│   └── FUTURE_ROADMAP.md
├── blog/                       # Complete narratives
│   └── AI_HUMAN_COLLABORATION_STORY.md
├── data/                       # Project analytics
│   ├── analysis-summary.json
│   └── project-analysis.json
├── tools/                      # Analysis utilities
│   └── project-analyzer.js
└── assets/                     # Supporting materials
    ├── architecture-diagrams/
    └── screenshots/
```

### Static Site Generation

This repository uses **Docusaurus** to generate beautiful documentation sites:

- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark/Light Themes**: User-toggleable theme switching
- **Internationalization**: Full support for multiple languages (English and Thai)
- **Full-Text Search**: Built-in search functionality
- **Navigation Hierarchy**: Auto-generated table of contents and cross-references
- **GitHub Integration**: Direct edit/view source links
- **Blog Support**: Integrated blog system for project stories
- **MDX Support**: Enhanced markdown with React components
- **Versioning**: Built-in documentation versioning support

## How to Use This Template

### For New AI-Human Collaboration Projects

1. **Create New Project Directory**
   ```bash
   mkdir 002-your-project-name
   cd 002-your-project-name
   ```

2. **Copy Template Structure**
   ```bash
   # Copy the directory structure from 001-uniserv-nft-carbon-credit
   cp -r 001-uniserv-nft-carbon-credit/* 002-your-project-name/
   ```

3. **Customize Documentation**
   - Update `PROJECT_OVERVIEW.md` with your project details
   - Replace content in `diary/` with your collaboration experiences
   - Document your specific challenges in `analysis/`
   - Create executive reports in `reports/`
   - Write your complete story in `blog/`

4. **Update Navigation**
   - Edit `sidebars.ts` to add your project to the navigation
   - Update `docs/intro.md` to reference your project
   - Add blog posts to `blog/` directory
   - Configure internationalization in `i18n/` if needed
   - Ensure all cross-references work correctly

5. **Generate Static Site**
   ```bash
   npm install           # Install dependencies
   npm run start         # Preview locally
   npm run build         # Build static site
   npm run serve         # Test production build
   npm run deploy        # Deploy to GitHub Pages
   ```

### For Template System Maintenance

#### Prerequisites
- Node.js 18.0+ and npm
- Git and GitHub CLI

#### Development Setup
```bash
# Clone the template repository
git clone https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB.git
cd AI-HUMAN-COLLAB-CAT-LAB/docusaurus-site

# Install dependencies
npm install

# Serve documentation locally
npm run start

# For Thai language development
npm run start -- --locale th
```

#### Adding New Projects to Template
1. Create new project directory with number prefix: `00X-project-name/`
2. Follow the established documentation structure
3. Copy documentation to `docs/` directory
4. Add blog posts to `blog/` directory
5. Update `sidebars.ts` navigation configuration
6. Add translations to `i18n/th/` if supporting Thai
7. Test site generation: `npm run build`
8. Deploy: `npm run deploy`

## Key Features of This Template

### Comprehensive Documentation Coverage
- **Personal AI Reflections**: Honest perspectives on collaboration dynamics
- **Technical Evolution**: Architecture decisions and stack migrations  
- **Problem-Solving Analysis**: Specific challenges with code examples
- **Executive Reporting**: Metrics, achievements, and outcomes
- **Complete Narratives**: Full project stories from start to finish

### Professional Presentation
- **Clean Visitor Experience**: Documentation focused, no build instructions visible
- **Cross-Referenced Navigation**: Easy movement between related topics
- **Reading Paths**: Multiple entry points (15min overview to 2hr complete experience)
- **Statistics and Metrics**: Word counts, session counts, achievement summaries
- **Mobile-Responsive**: Professional appearance across all devices

### Developer-Friendly
- **Template Documentation**: Clear usage instructions (this file)
- **Build System**: Docusaurus with React-based architecture
- **Version Control**: Git-based workflow with proper branching
- **Deployment**: One-command GitHub Pages deployment
- **Extensible**: Easy to add new project types and documentation patterns

## Template Content Guidelines

### Writing Standards
- **Honest Reflection**: Include real challenges and communication failures
- **Technical Depth**: Provide specific examples and code snippets
- **Executive Summary**: Balance detail with accessibility
- **Cross-References**: Link related concepts across documents
- **Statistics**: Include measurable outcomes and metrics

### Documentation Types
- **Diary Entries**: Personal AI perspectives on collaboration
- **Analysis Reports**: Problem-solving with technical details
- **Executive Summaries**: High-level outcomes and achievements
- **Complete Narratives**: Full project stories with chapters
- **Reference Materials**: APIs, configurations, and technical specs

## Success Metrics

A successful AI-human collaboration retrospective using this template should include:

- ✅ **Comprehensive Coverage**: 30,000+ words across multiple document types
- ✅ **Honest Reflection**: Unfiltered AI perspective on collaboration dynamics
- ✅ **Technical Depth**: Specific problems, solutions, and code examples
- ✅ **Professional Presentation**: Clean, navigable, mobile-responsive site
- ✅ **Cross-References**: Interconnected documentation with clear navigation paths
- ✅ **Measurable Outcomes**: Statistics, metrics, and quantified achievements

## Future Enhancements

This template system is designed to evolve with additional:

- **Project Types**: Frontend, backend, data science, research collaborations
- **Analysis Tools**: Automated git log analysis and GitHub API integration
- **Template Variants**: Different documentation structures for different project types
- **Community Features**: Contribution guidelines and collaboration patterns
- **Integration Tools**: Slack, Discord, and other collaboration platform exports

## Contributing

To contribute improvements to this template system:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement-name`
3. Make your changes and test with `npm run start`
4. Submit a pull request with detailed description

## License

This template system is designed to be freely used and adapted for documenting AI-human collaborative development projects. Each project using this template should maintain appropriate attribution to source repositories and collaborators.

---

*This CLAUDE.md file serves as both documentation and template guide for creating comprehensive AI-human collaboration retrospectives. It transforms scattered project insights into professional, searchable documentation that preserves the complete story of artificial intelligence and human creativity working together.*

## Important Repository Policies

### No Git Submodules Policy

**This repository must NOT contain any git submodules.** All directories should be regular directories tracked by git.

- **NEVER** use `git submodule add` command
- **NEVER** create directories with their own `.git` folders inside this repository
- If you encounter a directory with its own `.git` folder:
  1. Remove the `.git` folder: `rm -rf directory/.git`
  2. Add it as a regular directory: `git add directory/`
- If deployment fails due to submodule errors:
  1. Remove the submodule cache: `git rm --cached directory-name`
  2. Remove any `.git` folder inside the directory
  3. Re-add as regular directory

This policy ensures clean deployments and avoids the "fatal: No url found for submodule path" error during builds.