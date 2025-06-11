#!/usr/bin/env node
/**
 * Git Timeline Generator for AI-Human Collaboration Documentation
 * 
 * Generates timeline-based blog posts from git commit history
 * Optimized for Docusaurus with Thai language support
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitTimelineGenerator {
    constructor(options = {}) {
        this.repoPath = options.repoPath || process.cwd();
        this.outputDir = options.outputDir || './docusaurus-site/i18n/th/docusaurus-plugin-content-blog';
        this.authorName = options.authorName || 'Nat W';
        this.dateFormat = options.dateFormat || '%Y-%m-%d';
    }

    /**
     * Get git commit history with structured data
     */
    getCommitHistory(since = '2025-06-01', limit = 100) {
        try {
            const cmd = `git log --oneline --date=short --pretty=format:"%h|%ad|%s|%an" --date=format:"${this.dateFormat}" --since="${since}" -${limit}`;
            const output = execSync(cmd, { 
                cwd: this.repoPath, 
                encoding: 'utf8' 
            }).trim();
            
            return output.split('\n').map(line => {
                const [hash, date, message, author] = line.split('|');
                return {
                    hash: hash.trim(),
                    date: date.trim(),
                    message: message.trim(),
                    author: author.trim()
                };
            }).filter(commit => commit.hash); // Filter out empty lines
        } catch (error) {
            console.error('Error getting git history:', error.message);
            return [];
        }
    }

    /**
     * Group commits by date for timeline organization
     */
    groupCommitsByDate(commits) {
        const grouped = {};
        commits.forEach(commit => {
            if (!grouped[commit.date]) {
                grouped[commit.date] = [];
            }
            grouped[commit.date].push(commit);
        });
        return grouped;
    }

    /**
     * Categorize commits by type (feat, fix, refactor, etc.)
     */
    categorizeCommit(message) {
        const categories = {
            'feat': '🚀 คุณสมบัติใหม่',
            'fix': '🔧 แก้ไขบัค',
            'refactor': '♻️ ปรับปรุงโครงสร้าง',
            'docs': '📚 เอกสาร',
            'chore': '🧹 การบำรุงรักษา',
            'revert': '↩️ ย้อนกลับ',
            'Merge': '🔀 รวมการเปลี่ยนแปลง'
        };

        for (const [key, thai] of Object.entries(categories)) {
            if (message.toLowerCase().includes(key.toLowerCase())) {
                return { type: key, thaiLabel: thai };
            }
        }
        
        return { type: 'other', thaiLabel: '📝 อื่นๆ' };
    }

    /**
     * Generate Thai blog post content from commits
     */
    generateBlogPost(date, commits) {
        const thaiDate = this.formatThaiDate(date);
        const dayCommits = commits.length;
        
        let content = `---
slug: development-timeline-${date}
title: "พัฒนาการ ${thaiDate} - ${dayCommits} การเปลี่ยนแปลง"
authors: [natw]
tags: [development, timeline, git-history, ai-human-collaboration]
---

# พัฒนาการประจำวัน: ${thaiDate}

วันนี้มีการพัฒนาและปรับปรุงระบบทั้งหมด **${dayCommits} การเปลี่ยนแปลง** ดังนี้:

<!-- truncate -->

## 📋 สรุปการเปลี่ยนแปลงวันนี้

`;

        // Group by category
        const categorized = {};
        commits.forEach(commit => {
            const category = this.categorizeCommit(commit.message);
            if (!categorized[category.type]) {
                categorized[category.type] = {
                    label: category.thaiLabel,
                    commits: []
                };
            }
            categorized[category.type].commits.push(commit);
        });

        // Generate content by category
        Object.entries(categorized).forEach(([type, data]) => {
            content += `### ${data.label}\n\n`;
            data.commits.forEach(commit => {
                const cleanMessage = commit.message.replace(/^(feat|fix|refactor|docs|chore|revert):\s*/i, '');
                content += `- **${commit.hash}**: ${cleanMessage}\n`;
            });
            content += '\n';
        });

        // Add detailed timeline
        content += `## ⏰ ไทม์ไลน์รายละเอียด\n\n`;
        commits.forEach((commit, index) => {
            const category = this.categorizeCommit(commit.message);
            const cleanMessage = commit.message.replace(/^(feat|fix|refactor|docs|chore|revert):\s*/i, '');
            
            content += `### ${index + 1}. ${category.thaiLabel} ${commit.hash}\n\n`;
            content += `**การเปลี่ยนแปลง**: ${cleanMessage}\n\n`;
            content += `**ผู้พัฒนา**: ${commit.author}\n\n`;
            content += `---\n\n`;
        });

        // Add reflection section
        content += `## 🤔 การสะท้อนและข้อคิด\n\n`;
        content += `วันนี้เป็นวันที่มีการพัฒนาอย่างต่อเนื่อง โดยมีการปรับปรุงในหลายด้าน:\n\n`;
        
        const featCount = categorized.feat ? categorized.feat.commits.length : 0;
        const fixCount = categorized.fix ? categorized.fix.commits.length : 0;
        const refactorCount = categorized.refactor ? categorized.refactor.commits.length : 0;
        
        if (featCount > 0) {
            content += `- 🚀 **คุณสมบัติใหม่**: ${featCount} รายการ - แสดงให้เห็นถึงการพัฒนาไปข้างหน้า\n`;
        }
        if (fixCount > 0) {
            content += `- 🔧 **การแก้ไข**: ${fixCount} รายการ - การดูแลคุณภาพของระบบ\n`;
        }
        if (refactorCount > 0) {
            content += `- ♻️ **การปรับปรุงโครงสร้าง**: ${refactorCount} รายการ - การเตรียมพร้อมสำหรับอนาคต\n`;
        }

        content += `\n## 🔗 ลิงก์ที่เกี่ยวข้อง\n\n`;
        content += `- [ดูการเปลี่ยนแปลงใน GitHub](https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB/commits/main)\n`;
        content += `- [เอกสารโปรเจกต์](/docs/intro)\n`;
        content += `- [บล็อกอื่นๆ](/th/blog)\n\n`;

        content += `---\n\n`;
        content += `*บล็อกนี้สร้างขึ้นอัตโนมัติจาก Git commit history เพื่อติดตามพัฒนาการของโปรเจกต์ AI-Human Collaboration*\n`;

        return content;
    }

    /**
     * Format date in Thai format
     */
    formatThaiDate(dateString) {
        const date = new Date(dateString);
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        
        const day = date.getDate();
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543; // Convert to Buddhist Era
        
        return `${day} ${month} ${year}`;
    }

    /**
     * Generate timeline blog posts for all commit dates
     */
    generateTimelinePosts(since = '2025-06-01') {
        console.log('🚀 Starting timeline generation...');
        
        const commits = this.getCommitHistory(since);
        if (commits.length === 0) {
            console.log('❌ No commits found for the specified period');
            return;
        }

        console.log(`📊 Found ${commits.length} commits since ${since}`);
        
        const groupedCommits = this.groupCommitsByDate(commits);
        const dates = Object.keys(groupedCommits).sort().reverse(); // Latest first
        
        console.log(`📅 Processing ${dates.length} days of development`);

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        let generatedCount = 0;
        dates.forEach(date => {
            const dateCommits = groupedCommits[date];
            const filename = `${date}-development-timeline.md`;
            const filepath = path.join(this.outputDir, filename);
            
            // Only generate if file doesn't exist or if forced
            if (!fs.existsSync(filepath)) {
                const content = this.generateBlogPost(date, dateCommits);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`✅ Generated: ${filename} (${dateCommits.length} commits)`);
                generatedCount++;
            } else {
                console.log(`⏭️  Skipped: ${filename} (already exists)`);
            }
        });

        console.log(`🎉 Timeline generation complete! Generated ${generatedCount} new posts`);
        
        // Generate summary statistics
        this.generateSummaryStats(commits, dates);
    }

    /**
     * Generate summary statistics
     */
    generateSummaryStats(commits, dates) {
        const stats = {
            totalCommits: commits.length,
            activeDays: dates.length,
            commitTypes: {},
            authors: {}
        };

        commits.forEach(commit => {
            // Count by type
            const category = this.categorizeCommit(commit.message);
            stats.commitTypes[category.type] = (stats.commitTypes[category.type] || 0) + 1;
            
            // Count by author
            stats.authors[commit.author] = (stats.authors[commit.author] || 0) + 1;
        });

        console.log('\n📈 Development Statistics:');
        console.log(`   Total Commits: ${stats.totalCommits}`);
        console.log(`   Active Days: ${stats.activeDays}`);
        console.log(`   Average Commits/Day: ${(stats.totalCommits / stats.activeDays).toFixed(1)}`);
        
        console.log('\n📊 Commit Types:');
        Object.entries(stats.commitTypes).forEach(([type, count]) => {
            console.log(`   ${type}: ${count} commits`);
        });
        
        console.log('\n👥 Contributors:');
        Object.entries(stats.authors).forEach(([author, count]) => {
            console.log(`   ${author}: ${count} commits`);
        });
    }
}

// CLI Usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const since = args[0] || '2025-06-01';
    
    console.log('🔧 Git Timeline Generator for AI-Human Collaboration');
    console.log('📅 Generating timeline posts since:', since);
    console.log('');

    const generator = new GitTimelineGenerator({
        repoPath: process.cwd(),
        outputDir: './docusaurus-site/i18n/th/docusaurus-plugin-content-blog'
    });
    
    generator.generateTimelinePosts(since);
}

module.exports = GitTimelineGenerator;