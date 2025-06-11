#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class WorkingHoursAnalyzer {
    constructor() {
        this.humanHours = {};
        this.aiSessions = [];
        this.timezoneOffset = 7; // Bangkok time (UTC+7)
    }

    // Analyze git commits for human working hours
    analyzeGitLogs() {
        console.log('📊 Analyzing Git Commits for Human Working Hours...\n');
        
        try {
            // Get all commits with timestamp and author
            const gitLog = execSync('git log --pretty=format:"%ad|%an|%s" --date=iso', { encoding: 'utf8' });
            const commits = gitLog.split('\n').filter(line => line.trim());
            
            commits.forEach(commit => {
                const [dateStr, author, message] = commit.split('|');
                const date = new Date(dateStr);
                
                // Skip AI-generated commits
                if (message.includes('🤖') || author.includes('Claude')) {
                    return;
                }
                
                const hour = date.getHours();
                const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                const dateKey = date.toISOString().split('T')[0];
                
                if (!this.humanHours[dateKey]) {
                    this.humanHours[dateKey] = {
                        hours: new Set(),
                        commits: 0,
                        firstCommit: date,
                        lastCommit: date,
                        day: day
                    };
                }
                
                this.humanHours[dateKey].hours.add(hour);
                this.humanHours[dateKey].commits++;
                if (date < this.humanHours[dateKey].firstCommit) {
                    this.humanHours[dateKey].firstCommit = date;
                }
                if (date > this.humanHours[dateKey].lastCommit) {
                    this.humanHours[dateKey].lastCommit = date;
                }
            });
            
        } catch (error) {
            console.error('Error analyzing git logs:', error.message);
        }
    }

    // Extract AI session times from documentation
    analyzeAISessions() {
        console.log('\n🤖 Analyzing AI Session Times from Documentation...\n');
        
        const diaryPath = path.join(__dirname, '../001-uniserv-nft-carbon-credit/diary/SESSION_BY_SESSION_REALITY.md');
        
        try {
            const content = fs.readFileSync(diaryPath, 'utf8');
            
            // Extract session patterns
            const sessionPattern = /### Session (\d+):[^]*?- Date: ([^\n]+)\n- Time: ([^\n]+)/g;
            let match;
            
            while ((match = sessionPattern.exec(content)) !== null) {
                const [_, sessionNum, date, timeRange] = match;
                
                // Parse time range (e.g., "3:00 PM - 8:30 PM")
                const [startTime, endTime] = timeRange.split(' - ');
                
                this.aiSessions.push({
                    session: parseInt(sessionNum),
                    date: date.trim(),
                    startTime: startTime.trim(),
                    endTime: endTime.trim(),
                    duration: this.calculateDuration(startTime.trim(), endTime.trim())
                });
            }
            
        } catch (error) {
            console.error('Error reading AI session data:', error.message);
        }
    }

    calculateDuration(startTime, endTime) {
        const parseTime = (timeStr) => {
            const [time, period] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
        };
        
        const startMinutes = parseTime(startTime);
        const endMinutes = parseTime(endTime);
        const durationMinutes = endMinutes - startMinutes;
        
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        
        return `${hours}h ${minutes}m`;
    }

    generateReport() {
        console.log('\n📈 WORKING HOURS ANALYSIS REPORT\n');
        console.log('=' .repeat(60));
        
        // Human working hours analysis
        console.log('\n👤 HUMAN WORKING PATTERNS:\n');
        
        const workingDays = Object.keys(this.humanHours).sort();
        let totalHumanHours = 0;
        let weekendWork = 0;
        let nightWork = 0;
        let morningWork = 0;
        let afternoonWork = 0;
        let eveningWork = 0;
        
        workingDays.forEach(date => {
            const data = this.humanHours[date];
            const workHours = data.hours.size;
            totalHumanHours += workHours;
            
            // Weekend check
            if (data.day === 'Saturday' || data.day === 'Sunday') {
                weekendWork++;
            }
            
            // Time of day analysis
            data.hours.forEach(hour => {
                if (hour >= 0 && hour < 6) nightWork++;
                else if (hour >= 6 && hour < 12) morningWork++;
                else if (hour >= 12 && hour < 18) afternoonWork++;
                else eveningWork++;
            });
            
            console.log(`📅 ${date} (${data.day})`);
            console.log(`   ⏰ Active Hours: ${Array.from(data.hours).sort((a, b) => a - b).map(h => `${h}:00`).join(', ')}`);
            console.log(`   📝 Commits: ${data.commits}`);
            console.log(`   ⏱️  Work Duration: ~${workHours} hours\n`);
        });
        
        console.log('\n📊 HUMAN WORK STATISTICS:');
        console.log(`   Total Working Days: ${workingDays.length}`);
        console.log(`   Total Estimated Hours: ~${totalHumanHours}`);
        console.log(`   Weekend Days Worked: ${weekendWork}`);
        console.log(`   Average Hours per Day: ${(totalHumanHours / workingDays.length).toFixed(1)}`);
        
        console.log('\n⏰ TIME PREFERENCE:');
        console.log(`   🌙 Night (00:00-06:00): ${nightWork} hours`);
        console.log(`   ☀️  Morning (06:00-12:00): ${morningWork} hours`);
        console.log(`   🌤️  Afternoon (12:00-18:00): ${afternoonWork} hours`);
        console.log(`   🌆 Evening (18:00-24:00): ${eveningWork} hours`);
        
        // AI working hours analysis
        if (this.aiSessions.length > 0) {
            console.log('\n\n🤖 AI SESSION PATTERNS:\n');
            
            let totalAIMinutes = 0;
            const sessionsByDay = {};
            
            this.aiSessions.forEach(session => {
                console.log(`📅 Session ${session.session}: ${session.date}`);
                console.log(`   ⏰ Time: ${session.startTime} - ${session.endTime}`);
                console.log(`   ⏱️  Duration: ${session.duration}\n`);
                
                // Calculate total time
                const [hours, minutes] = session.duration.match(/(\d+)h (\d+)m/).slice(1).map(Number);
                totalAIMinutes += hours * 60 + minutes;
                
                // Group by day
                const dayOfWeek = new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' });
                if (!sessionsByDay[dayOfWeek]) sessionsByDay[dayOfWeek] = 0;
                sessionsByDay[dayOfWeek]++;
            });
            
            console.log('\n📊 AI SESSION STATISTICS:');
            console.log(`   Total Sessions: ${this.aiSessions.length}`);
            console.log(`   Total Time: ${Math.floor(totalAIMinutes / 60)}h ${totalAIMinutes % 60}m`);
            console.log(`   Average Session: ${Math.floor(totalAIMinutes / this.aiSessions.length / 60)}h ${Math.floor(totalAIMinutes / this.aiSessions.length % 60)}m`);
            
            console.log('\n📅 SESSIONS BY DAY:');
            Object.entries(sessionsByDay).forEach(([day, count]) => {
                console.log(`   ${day}: ${count} sessions`);
            });
        }
        
        // Collaboration insights
        console.log('\n\n🤝 COLLABORATION INSIGHTS:\n');
        console.log('• Human tends to work in concentrated bursts across multiple hours');
        console.log('• AI sessions are typically longer and more focused (3-5 hours)');
        console.log(`• Weekend work detected: ${weekendWork > 0 ? 'Yes' : 'No'}`);
        console.log(`• Most productive time: ${this.getMostProductiveTime(morningWork, afternoonWork, eveningWork, nightWork)}`);
        
        console.log('\n' + '=' .repeat(60));
    }

    getMostProductiveTime(morning, afternoon, evening, night) {
        const times = [
            { name: 'Morning (06:00-12:00)', count: morning },
            { name: 'Afternoon (12:00-18:00)', count: afternoon },
            { name: 'Evening (18:00-24:00)', count: evening },
            { name: 'Night (00:00-06:00)', count: night }
        ];
        
        return times.sort((a, b) => b.count - a.count)[0].name;
    }

    run() {
        console.log('🕐 Working Hours Analyzer\n');
        console.log('Analyzing human and AI working patterns...\n');
        
        this.analyzeGitLogs();
        this.analyzeAISessions();
        this.generateReport();
        
        // Save report to file
        const reportPath = path.join(__dirname, '../data/working-hours-analysis.json');
        const reportData = {
            generatedAt: new Date().toISOString(),
            humanWorkingDays: this.humanHours,
            aiSessions: this.aiSessions,
            summary: {
                totalHumanDays: Object.keys(this.humanHours).length,
                totalAISessions: this.aiSessions.length,
                analyzedRepository: 'AI-HUMAN-COLLAB-CAT-LAB'
            }
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
        console.log(`\n💾 Report saved to: ${reportPath}`);
    }
}

// Run the analyzer
const analyzer = new WorkingHoursAnalyzer();
analyzer.run();