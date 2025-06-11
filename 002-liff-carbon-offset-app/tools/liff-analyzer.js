#!/usr/bin/env node

/**
 * LIFF Carbon Offset App Analyzer - Comprehensive Repository Analysis
 * 
 * Extracts and analyzes:
 * - Git commit history with file changes
 * - GitHub issues, PRs, and comments  
 * - LIFF application architecture
 * - Carbon offset functionality
 * - Development timeline and patterns
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ProjectAnalyzer {
    constructor() {
        this.projectRoot = '/home/floodboy/AI-HUMAN-COLLAB-CAT-LAB/liff-carbon-offset-app';
        this.dataDir = path.resolve(__dirname, '../data');
        this.outputFile = path.join(this.dataDir, 'liff-analysis.json');
        
        // Ensure data directory exists
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
        
        this.analysis = {
            metadata: {
                extracted_at: new Date().toISOString(),
                project_root: this.projectRoot,
                analyzer_version: '1.0.0'
            },
            git_history: [],
            github_data: {},
            ai_sessions: [],
            file_evolution: {},
            timeline: [],
            statistics: {},
            patterns: {}
        };
    }

    async analyze() {
        console.log('🔍 Starting comprehensive project analysis...');
        
        try {
            // Core data extraction
            await this.extractGitHistory();
            await this.extractGitStatistics();
            await this.extractAISessions();
            await this.extractFileEvolution();
            await this.extractGitHubData();
            
            // Analysis and correlation
            await this.buildTimeline();
            await this.analyzePatterns();
            await this.generateStatistics();
            
            // Save results
            await this.saveResults();
            
            console.log('✅ Analysis complete! Results saved to:', this.outputFile);
            this.printSummary();
            
        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
            throw error;
        }
    }

    async extractGitHistory() {
        console.log('📝 Extracting git commit history...');
        
        try {
            // Get detailed commit history
            const gitLogCmd = `git log --pretty=format:'{"hash":"%H","short_hash":"%h","date":"%ai","author":"%an","email":"%ae","subject":"%s","body":"%b"}' --name-status`;
            const rawOutput = execSync(gitLogCmd, { 
                cwd: this.projectRoot, 
                encoding: 'utf8',
                maxBuffer: 1024 * 1024 * 10 // 10MB buffer
            });

            const commits = this.parseGitLog(rawOutput);
            this.analysis.git_history = commits;
            
            console.log(`   Found ${commits.length} commits`);
            
        } catch (error) {
            console.warn('⚠️  Git history extraction failed:', error.message);
            this.analysis.git_history = [];
        }
    }

    parseGitLog(rawOutput) {
        const commits = [];
        const lines = rawOutput.split('\n');
        let currentCommit = null;
        
        for (const line of lines) {
            if (line.startsWith('{')) {
                // New commit JSON
                if (currentCommit) {
                    commits.push(currentCommit);
                }
                try {
                    currentCommit = JSON.parse(line);
                    currentCommit.files = [];
                } catch (e) {
                    console.warn('Failed to parse commit line:', line);
                }
            } else if (currentCommit && line.match(/^[AMD]\s+/)) {
                // File change line
                const [status, ...fileParts] = line.split('\t');
                const file = fileParts.join('\t');
                currentCommit.files.push({
                    status: status.trim(),
                    file: file
                });
            }
        }
        
        if (currentCommit) {
            commits.push(currentCommit);
        }
        
        return commits;
    }

    async extractGitStatistics() {
        console.log('📊 Extracting git statistics...');
        
        try {
            // Branch information
            const branches = execSync('git branch -a', { cwd: this.projectRoot, encoding: 'utf8' })
                .split('\n')
                .filter(line => line.trim())
                .map(line => line.replace(/^\*?\s+/, '').replace(/^remotes\//, ''));

            // Contributor statistics
            const contributors = execSync('git shortlog -sn --all', { cwd: this.projectRoot, encoding: 'utf8' })
                .split('\n')
                .filter(line => line.trim())
                .map(line => {
                    const match = line.match(/^\s*(\d+)\s+(.+)$/);
                    return match ? { commits: parseInt(match[1]), name: match[2] } : null;
                })
                .filter(Boolean);

            // File change statistics
            const fileStats = execSync('git log --pretty=format: --name-only | sort | uniq -c | sort -rg', { 
                cwd: this.projectRoot, 
                encoding: 'utf8' 
            })
                .split('\n')
                .filter(line => line.trim())
                .slice(0, 20) // Top 20 most changed files
                .map(line => {
                    const match = line.trim().match(/^\s*(\d+)\s+(.+)$/);
                    return match ? { changes: parseInt(match[1]), file: match[2] } : null;
                })
                .filter(Boolean);

            this.analysis.git_statistics = {
                branches,
                contributors,
                top_changed_files: fileStats
            };

        } catch (error) {
            console.warn('⚠️  Git statistics extraction failed:', error.message);
        }
    }

    async extractAISessions() {
        console.log('🤖 Extracting AI session documentation...');
        
        const sessionDirs = [
            'docs',
            '.'
        ];
        
        const sessions = [];
        
        for (const dir of sessionDirs) {
            const fullPath = path.join(this.projectRoot, dir);
            if (fs.existsSync(fullPath)) {
                const files = fs.readdirSync(fullPath);
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        const filePath = path.join(fullPath, file);
                        const content = fs.readFileSync(filePath, 'utf8');
                        
                        sessions.push({
                            file: path.join(dir, file),
                            title: this.extractTitle(content),
                            word_count: content.split(/\s+/).length,
                            sections: this.extractSections(content),
                            date_mentioned: this.extractDateMentions(content)
                        });
                    }
                }
            }
        }
        
        this.analysis.ai_sessions = sessions;
        console.log(`   Found ${sessions.length} AI session documents`);
    }

    extractTitle(content) {
        const match = content.match(/^#\s+(.+)$/m);
        return match ? match[1] : 'Untitled';
    }

    extractSections(content) {
        const sections = [];
        const lines = content.split('\n');
        
        for (const line of lines) {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                sections.push({
                    level: match[1].length,
                    title: match[2]
                });
            }
        }
        
        return sections;
    }

    extractDateMentions(content) {
        const datePatterns = [
            /\b\d{4}-\d{2}-\d{2}\b/g,
            /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/g,
            /Session\s+(\d+)/gi
        ];
        
        const dates = [];
        for (const pattern of datePatterns) {
            const matches = content.match(pattern);
            if (matches) {
                dates.push(...matches);
            }
        }
        
        return [...new Set(dates)]; // Remove duplicates
    }

    async extractFileEvolution() {
        console.log('📂 Analyzing file evolution...');
        
        const keyDirectories = [
            'src',
            'workers',
            'scripts',
            'docs',
            'public',
            'src/app',
            'src/components',
            'workers/routes'
        ];
        
        const evolution = {};
        
        for (const dir of keyDirectories) {
            const fullPath = path.join(this.projectRoot, dir);
            if (fs.existsSync(fullPath)) {
                try {
                    // Get file creation and modification timeline for this directory
                    const gitLogDir = `git log --follow --pretty=format:'%ai|%H|%s' --name-only -- ${dir}`;
                    const output = execSync(gitLogDir, { 
                        cwd: this.projectRoot, 
                        encoding: 'utf8' 
                    });
                    
                    evolution[dir] = {
                        total_changes: (output.match(/\n/g) || []).length,
                        first_commit: this.findFirstCommit(output),
                        last_commit: this.findLastCommit(output),
                        file_count: this.countFiles(fullPath)
                    };
                } catch (error) {
                    console.warn(`   Failed to analyze ${dir}:`, error.message);
                }
            }
        }
        
        this.analysis.file_evolution = evolution;
    }

    findFirstCommit(gitOutput) {
        const lines = gitOutput.split('\n').filter(line => line.includes('|'));
        return lines.length > 0 ? lines[lines.length - 1] : null;
    }

    findLastCommit(gitOutput) {
        const lines = gitOutput.split('\n').filter(line => line.includes('|'));
        return lines.length > 0 ? lines[0] : null;
    }

    countFiles(dirPath) {
        try {
            const files = fs.readdirSync(dirPath, { recursive: true });
            return files.filter(file => {
                const fullPath = path.join(dirPath, file);
                return fs.statSync(fullPath).isFile();
            }).length;
        } catch (error) {
            return 0;
        }
    }

    async extractGitHubData() {
        console.log('🐙 Extracting GitHub data...');
        
        try {
            // Check if gh CLI is available
            execSync('gh --version', { stdio: 'ignore' });
            
            // Extract issues
            const issuesJson = execSync('gh issue list --limit 100 --json number,title,state,createdAt,closedAt,labels,assignees', {
                cwd: this.projectRoot,
                encoding: 'utf8'
            });
            
            // Extract PRs
            const prsJson = execSync('gh pr list --limit 100 --json number,title,state,createdAt,closedAt,mergedAt,labels', {
                cwd: this.projectRoot,
                encoding: 'utf8'
            });
            
            this.analysis.github_data = {
                issues: JSON.parse(issuesJson),
                pull_requests: JSON.parse(prsJson),
                extracted_at: new Date().toISOString()
            };
            
            console.log(`   Found ${JSON.parse(issuesJson).length} issues and ${JSON.parse(prsJson).length} PRs`);
            
        } catch (error) {
            console.warn('⚠️  GitHub data extraction failed (gh CLI not available or not authenticated):', error.message);
            this.analysis.github_data = {
                error: 'GitHub CLI not available or not authenticated',
                issues: [],
                pull_requests: []
            };
        }
    }

    async buildTimeline() {
        console.log('⏰ Building comprehensive timeline...');
        
        const timeline = [];
        
        // Add git commits
        for (const commit of this.analysis.git_history) {
            timeline.push({
                type: 'commit',
                date: commit.date,
                title: commit.subject,
                details: {
                    hash: commit.short_hash,
                    author: commit.author,
                    files_changed: commit.files.length
                }
            });
        }
        
        // Add GitHub issues
        if (this.analysis.github_data.issues) {
            for (const issue of this.analysis.github_data.issues) {
                timeline.push({
                    type: 'issue_created',
                    date: issue.createdAt,
                    title: `Issue #${issue.number}: ${issue.title}`,
                    details: issue
                });
                
                if (issue.closedAt) {
                    timeline.push({
                        type: 'issue_closed',
                        date: issue.closedAt,
                        title: `Closed #${issue.number}: ${issue.title}`,
                        details: issue
                    });
                }
            }
        }
        
        // Add GitHub PRs
        if (this.analysis.github_data.pull_requests) {
            for (const pr of this.analysis.github_data.pull_requests) {
                timeline.push({
                    type: 'pr_created',
                    date: pr.createdAt,
                    title: `PR #${pr.number}: ${pr.title}`,
                    details: pr
                });
                
                if (pr.mergedAt) {
                    timeline.push({
                        type: 'pr_merged',
                        date: pr.mergedAt,
                        title: `Merged #${pr.number}: ${pr.title}`,
                        details: pr
                    });
                }
            }
        }
        
        // Sort timeline by date
        timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        this.analysis.timeline = timeline;
        console.log(`   Built timeline with ${timeline.length} events`);
    }

    async analyzePatterns() {
        console.log('🔍 Analyzing development patterns...');
        
        const patterns = {
            commit_frequency: this.analyzeCommitFrequency(),
            development_phases: this.identifyDevelopmentPhases(),
            collaboration_patterns: this.analyzeCollaborationPatterns(),
            file_hotspots: this.identifyFileHotspots()
        };
        
        this.analysis.patterns = patterns;
    }

    analyzeCommitFrequency() {
        const commitsByDate = {};
        
        for (const commit of this.analysis.git_history) {
            const date = commit.date.split('T')[0]; // Get just the date part
            commitsByDate[date] = (commitsByDate[date] || 0) + 1;
        }
        
        return {
            daily_commits: commitsByDate,
            most_active_day: Object.entries(commitsByDate).reduce((a, b) => 
                commitsByDate[a[0]] > commitsByDate[b[0]] ? a : b
            ),
            total_days: Object.keys(commitsByDate).length
        };
    }

    identifyDevelopmentPhases() {
        const phases = [];
        const commits = this.analysis.git_history;
        
        // Simple phase detection based on commit messages
        const phaseKeywords = {
            'Initial Setup': ['initial', 'setup', 'init', 'scaffold'],
            'LIFF Development': ['liff', 'line', 'webapp', 'frontend'],
            'Backend Development': ['worker', 'api', 'route', 'hono'],
            'Carbon Offset': ['carbon', 'offset', 'emission', 'environment'],
            'Payment Integration': ['payment', 'receipt', 'verification', 'stripe'],
            'Admin Features': ['admin', 'dashboard', 'management'],
            'Event Management': ['dinner', 'talk', 'guest', 'registration'],
            'Testing': ['test', 'spec', 'coverage'],
            'Documentation': ['doc', 'readme', 'md', 'guide'],
            'Deployment': ['deploy', 'production', 'release', 'cloudflare'],
            'Bug Fixes': ['fix', 'bug', 'error', 'issue'],
            'Features': ['feat', 'feature', 'add'],
            'Refactoring': ['refactor', 'improve', 'optimize']
        };
        
        const phaseStats = {};
        
        for (const commit of commits) {
            const message = commit.subject.toLowerCase();
            
            for (const [phase, keywords] of Object.entries(phaseKeywords)) {
                if (keywords.some(keyword => message.includes(keyword))) {
                    phaseStats[phase] = (phaseStats[phase] || 0) + 1;
                    break;
                }
            }
        }
        
        return phaseStats;
    }

    analyzeCollaborationPatterns() {
        const authors = {};
        
        for (const commit of this.analysis.git_history) {
            const author = commit.author;
            if (!authors[author]) {
                authors[author] = {
                    commits: 0,
                    files_changed: 0,
                    first_commit: commit.date,
                    last_commit: commit.date
                };
            }
            
            authors[author].commits++;
            authors[author].files_changed += commit.files.length;
            
            if (new Date(commit.date) < new Date(authors[author].first_commit)) {
                authors[author].first_commit = commit.date;
            }
            if (new Date(commit.date) > new Date(authors[author].last_commit)) {
                authors[author].last_commit = commit.date;
            }
        }
        
        return authors;
    }

    identifyFileHotspots() {
        const fileChanges = {};
        
        for (const commit of this.analysis.git_history) {
            for (const file of commit.files) {
                const fileName = file.file;
                if (!fileChanges[fileName]) {
                    fileChanges[fileName] = 0;
                }
                fileChanges[fileName]++;
            }
        }
        
        // Get top 20 most changed files
        return Object.entries(fileChanges)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 20)
            .map(([file, changes]) => ({ file, changes }));
    }

    async generateStatistics() {
        console.log('📈 Generating project statistics...');
        
        const stats = {
            overview: {
                total_commits: this.analysis.git_history.length,
                total_ai_sessions: this.analysis.ai_sessions.length,
                total_files_tracked: Object.keys(this.analysis.file_evolution).length,
                timeline_events: this.analysis.timeline.length
            },
            repository: {
                first_commit: this.analysis.git_history[this.analysis.git_history.length - 1]?.date,
                last_commit: this.analysis.git_history[0]?.date,
                total_contributors: Object.keys(this.analysis.patterns.collaboration_patterns || {}).length
            },
            development: {
                most_changed_file: this.analysis.patterns.file_hotspots[0],
                most_active_phase: this.getMostActivePhase(),
                session_documentation: this.analysis.ai_sessions.reduce((sum, session) => sum + session.word_count, 0)
            }
        };
        
        this.analysis.statistics = stats;
    }

    getMostActivePhase() {
        const phases = this.analysis.patterns.development_phases;
        return Object.entries(phases).reduce((a, b) => phases[a[0]] > phases[b[0]] ? a : b);
    }

    async saveResults() {
        console.log('💾 Saving analysis results...');
        
        const output = JSON.stringify(this.analysis, null, 2);
        fs.writeFileSync(this.outputFile, output);
        
        // Also save a summary file
        const summaryFile = path.join(this.dataDir, 'analysis-summary.json');
        const summary = {
            metadata: this.analysis.metadata,
            statistics: this.analysis.statistics,
            quick_facts: {
                total_commits: this.analysis.git_history.length,
                ai_sessions: this.analysis.ai_sessions.length,
                timeline_events: this.analysis.timeline.length,
                contributors: Object.keys(this.analysis.patterns.collaboration_patterns || {}).length
            }
        };
        
        fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    }

    printSummary() {
        console.log('\n📊 PROJECT ANALYSIS SUMMARY');
        console.log('=' * 50);
        console.log(`📝 Total Commits: ${this.analysis.statistics.overview.total_commits}`);
        console.log(`🤖 AI Sessions: ${this.analysis.statistics.overview.total_ai_sessions}`);
        console.log(`⏰ Timeline Events: ${this.analysis.statistics.overview.timeline_events}`);
        console.log(`👥 Contributors: ${this.analysis.statistics.repository.total_contributors}`);
        console.log(`📂 Tracked Directories: ${this.analysis.statistics.overview.total_files_tracked}`);
        
        if (this.analysis.patterns.file_hotspots.length > 0) {
            const hotspot = this.analysis.patterns.file_hotspots[0];
            console.log(`🔥 Most Changed File: ${hotspot.file} (${hotspot.changes} changes)`);
        }
        
        console.log(`\n📄 Full analysis saved to: ${this.outputFile}`);
        console.log(`📄 Summary saved to: ${path.join(this.dataDir, 'analysis-summary.json')}`);
    }
}

// CLI execution
if (require.main === module) {
    const analyzer = new ProjectAnalyzer();
    analyzer.analyze().catch(error => {
        console.error('❌ Analysis failed:', error);
        process.exit(1);
    });
}

module.exports = ProjectAnalyzer;