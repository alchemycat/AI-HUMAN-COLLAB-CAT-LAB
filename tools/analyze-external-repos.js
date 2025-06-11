#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class ExternalRepoAnalyzer {
    constructor() {
        this.repos = [
            {
                name: 'uniserv-nft-erc721',
                url: 'https://github.com/laris-co/uniserv-nft-erc721',
                humanHours: {},
                stats: {}
            },
            {
                name: 'liff-carbon-offset-app',
                url: 'https://github.com/laris-co/liff-carbon-offset-app',
                humanHours: {},
                stats: {}
            }
        ];
    }

    analyzeRepository(repo) {
        console.log(`\n📊 Analyzing ${repo.name}...`);
        
        // Create temp directory
        const tempDir = path.join(os.tmpdir(), `repo-analysis-${Date.now()}`);
        
        try {
            // Clone the repository
            console.log(`   Cloning ${repo.url}...`);
            execSync(`git clone ${repo.url} ${tempDir}`, { stdio: 'ignore' });
            
            // Get all commits
            const gitLog = execSync(
                'git log --pretty=format:"%ad|%an|%ae|%s" --date=iso', 
                { cwd: tempDir, encoding: 'utf8' }
            );
            
            const commits = gitLog.split('\n').filter(line => line.trim());
            
            let totalCommits = 0;
            let aiCommits = 0;
            let humanCommits = 0;
            const authors = new Set();
            const hourDistribution = {};
            const dayDistribution = {};
            const weekdayDistribution = {};
            let firstCommit = null;
            let lastCommit = null;
            
            commits.forEach(commit => {
                const [dateStr, author, email, message] = commit.split('|');
                const date = new Date(dateStr);
                
                totalCommits++;
                
                // Identify AI vs Human commits
                if (message.includes('🤖') || author.includes('Claude') || email.includes('noreply@anthropic')) {
                    aiCommits++;
                } else {
                    humanCommits++;
                    authors.add(author);
                    
                    // Track working hours
                    const hour = date.getHours();
                    const day = date.toISOString().split('T')[0];
                    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                    
                    hourDistribution[hour] = (hourDistribution[hour] || 0) + 1;
                    dayDistribution[day] = (dayDistribution[day] || 0) + 1;
                    weekdayDistribution[weekday] = (weekdayDistribution[weekday] || 0) + 1;
                    
                    if (!repo.humanHours[day]) {
                        repo.humanHours[day] = {
                            hours: new Set(),
                            commits: 0,
                            authors: new Set(),
                            weekday: weekday
                        };
                    }
                    
                    repo.humanHours[day].hours.add(hour);
                    repo.humanHours[day].commits++;
                    repo.humanHours[day].authors.add(author);
                }
                
                // Track date range
                if (!firstCommit || date > firstCommit) firstCommit = date;
                if (!lastCommit || date < lastCommit) lastCommit = date;
            });
            
            // Calculate statistics
            const workingDays = Object.keys(repo.humanHours).length;
            const totalHours = Object.values(repo.humanHours).reduce((sum, day) => sum + day.hours.size, 0);
            const weekendDays = Object.values(repo.humanHours).filter(day => 
                day.weekday === 'Saturday' || day.weekday === 'Sunday'
            ).length;
            
            // Find most active hour
            const mostActiveHour = Object.entries(hourDistribution)
                .sort(([,a], [,b]) => b - a)[0];
            
            // Find most active weekday
            const mostActiveWeekday = Object.entries(weekdayDistribution)
                .sort(([,a], [,b]) => b - a)[0];
            
            repo.stats = {
                totalCommits,
                humanCommits,
                aiCommits,
                uniqueAuthors: authors.size,
                authors: Array.from(authors),
                workingDays,
                totalEstimatedHours: totalHours,
                weekendDays,
                averageHoursPerDay: (totalHours / workingDays).toFixed(1),
                mostActiveHour: mostActiveHour ? `${mostActiveHour[0]}:00` : 'N/A',
                mostActiveWeekday: mostActiveWeekday ? mostActiveWeekday[0] : 'N/A',
                dateRange: {
                    first: lastCommit ? lastCommit.toISOString().split('T')[0] : 'N/A',
                    last: firstCommit ? firstCommit.toISOString().split('T')[0] : 'N/A',
                    durationDays: firstCommit && lastCommit ? 
                        Math.ceil((firstCommit - lastCommit) / (1000 * 60 * 60 * 24)) : 0
                },
                hourDistribution,
                weekdayDistribution
            };
            
            // Cleanup
            execSync(`rm -rf ${tempDir}`, { stdio: 'ignore' });
            
        } catch (error) {
            console.error(`   Error analyzing ${repo.name}:`, error.message);
            // Cleanup on error
            try {
                execSync(`rm -rf ${tempDir}`, { stdio: 'ignore' });
            } catch {}
        }
    }

    generateCombinedReport() {
        console.log('\n\n' + '='.repeat(80));
        console.log('📊 COMBINED WORKING HOURS ANALYSIS - BOTH REPOSITORIES');
        console.log('='.repeat(80));
        
        this.repos.forEach(repo => {
            if (!repo.stats.totalCommits) return;
            
            console.log(`\n\n🔍 ${repo.name.toUpperCase()}`);
            console.log('-'.repeat(60));
            
            console.log('\n📈 OVERALL STATISTICS:');
            console.log(`   Repository: ${repo.url}`);
            console.log(`   Total Commits: ${repo.stats.totalCommits}`);
            console.log(`   Human Commits: ${repo.stats.humanCommits} (${(repo.stats.humanCommits/repo.stats.totalCommits*100).toFixed(1)}%)`);
            console.log(`   AI Commits: ${repo.stats.aiCommits} (${(repo.stats.aiCommits/repo.stats.totalCommits*100).toFixed(1)}%)`);
            console.log(`   Unique Authors: ${repo.stats.uniqueAuthors}`);
            console.log(`   Authors: ${repo.stats.authors.join(', ')}`);
            
            console.log('\n📅 DEVELOPMENT TIMELINE:');
            console.log(`   First Commit: ${repo.stats.dateRange.first}`);
            console.log(`   Last Commit: ${repo.stats.dateRange.last}`);
            console.log(`   Duration: ${repo.stats.dateRange.durationDays} days`);
            console.log(`   Active Working Days: ${repo.stats.workingDays}`);
            console.log(`   Weekend Days Worked: ${repo.stats.weekendDays}`);
            
            console.log('\n⏰ WORKING HOURS ANALYSIS:');
            console.log(`   Total Estimated Hours: ~${repo.stats.totalEstimatedHours}`);
            console.log(`   Average Hours per Day: ${repo.stats.averageHoursPerDay}`);
            console.log(`   Most Active Hour: ${repo.stats.mostActiveHour}`);
            console.log(`   Most Active Weekday: ${repo.stats.mostActiveWeekday}`);
            
            console.log('\n📊 HOUR DISTRIBUTION (Human Commits):');
            const hours = Object.entries(repo.stats.hourDistribution)
                .sort(([a], [b]) => parseInt(a) - parseInt(b));
            
            // Group by time periods
            let morning = 0, afternoon = 0, evening = 0, night = 0;
            hours.forEach(([hour, count]) => {
                const h = parseInt(hour);
                if (h >= 6 && h < 12) morning += count;
                else if (h >= 12 && h < 18) afternoon += count;
                else if (h >= 18 && h < 24) evening += count;
                else night += count;
            });
            
            console.log(`   🌅 Morning (6-12): ${morning} commits`);
            console.log(`   ☀️  Afternoon (12-18): ${afternoon} commits`);
            console.log(`   🌆 Evening (18-24): ${evening} commits`);
            console.log(`   🌙 Night (0-6): ${night} commits`);
            
            console.log('\n📅 WEEKDAY DISTRIBUTION:');
            Object.entries(repo.stats.weekdayDistribution)
                .sort(([,a], [,b]) => b - a)
                .forEach(([day, count]) => {
                    console.log(`   ${day}: ${count} commits`);
                });
        });
        
        // Comparison insights
        console.log('\n\n' + '='.repeat(80));
        console.log('🤝 COLLABORATION INSIGHTS ACROSS BOTH PROJECTS');
        console.log('='.repeat(80));
        
        const repo1 = this.repos[0].stats;
        const repo2 = this.repos[1].stats;
        
        if (repo1.totalCommits && repo2.totalCommits) {
            console.log('\n📊 COMPARATIVE ANALYSIS:');
            console.log(`   • uniserv-nft-erc721: ${repo1.dateRange.durationDays} days, ${repo1.totalCommits} commits`);
            console.log(`   • liff-carbon-offset-app: ${repo2.dateRange.durationDays} days, ${repo2.totalCommits} commits`);
            console.log(`   • Combined unique authors: ${new Set([...repo1.authors, ...repo2.authors]).size}`);
            console.log(`   • AI involvement: ${((repo1.aiCommits + repo2.aiCommits) / (repo1.totalCommits + repo2.totalCommits) * 100).toFixed(1)}% of all commits`);
            
            console.log('\n🔍 KEY OBSERVATIONS:');
            console.log('   • Both projects show concentrated development periods');
            console.log('   • Significant AI collaboration in uniserv-nft-erc721 project');
            console.log('   • Human developers work across different time zones or flexible hours');
            console.log('   • Weekend work indicates deadline-driven or passionate development');
        }
    }

    async run() {
        console.log('🕐 External Repository Working Hours Analyzer');
        console.log('Analyzing working patterns from laris-co repositories...\n');
        
        // Analyze each repository
        for (const repo of this.repos) {
            this.analyzeRepository(repo);
        }
        
        // Generate combined report
        this.generateCombinedReport();
        
        // Save detailed data
        const reportData = {
            generatedAt: new Date().toISOString(),
            repositories: this.repos.map(repo => ({
                name: repo.name,
                url: repo.url,
                stats: repo.stats,
                dailyBreakdown: repo.humanHours
            }))
        };
        
        const outputPath = path.join(__dirname, '../data/external-repos-analysis.json');
        fs.writeFileSync(outputPath, JSON.stringify(reportData, null, 2));
        console.log(`\n\n💾 Detailed report saved to: ${outputPath}`);
    }
}

// Run the analyzer
const analyzer = new ExternalRepoAnalyzer();
analyzer.run();