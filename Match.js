/*
[❓#1] The Cricket Match
You need to implement a class Match which obeys following properties
You need to ask the user
Number of overs
Team-1 Name, players count of that team
Team-2 Name, players count of that team
Wide ball extra runs
No ball extra runs
Toss and elected to bat/field
Start an innings, End an innings
A Match has the following properties
winners
Should return a winning team with wining criteria like win by wicket or by runs
if win by wicket <Team Name> Won the match by <x> wickets
if win by runs <Team Name> Won the match by <x> runs
if match is not ended return MATCH IN PROGRESS >
exportStats
You need to write the match statistics to a file
No need to have tables
Save The data to Statistics.txt file
Match Statistics as follows
+----------------------------+
| Match statistics           |
+----------------------------+
|<Match Status>              |
+----------------------------+
| <Match Overs>              |
+----------------------------+
| <Team Name>                |
+----------+-----------------+
| Runs     | <Runs Scored>   |
+----------+-----------------+
| Over     | <Overs Played>  |
+----------+-----------------+
| Wickets  | <Wickets Lost>  |
+----------+-----------------+
| Extras   | <Extra for Inn> |
+----------+-----------------+
| Run Rate | <RR for Inn>    |
+----------+-----------------+
Example
Match statistics

Team INDIA Won the Match

5 overs match

Team INDIA

RUNS 50
OVERS 5
WICKETS 3
EXTRAS 4
RUN RATE 7.5

Team PAK

RUNS 47
OVERS 5
WICKETS 2
EXTRAS 2
RUN RATE 7
Constraints
Overs

You need use previously used Over class in Assignment 10
End of innings

If N-1 player's of a team out innings will be End
If Number of overs of matches completed innings will End
Players count

Players per team should min 5 and max 11
Both teams should have equal number of players
exportStats

Match status
When match completed - <Team Name> Won the match
When match not stated - Match Not Started
When 1st innings completed - 1st innings completed
When Innings in process - Match In Progress
If you don't have stats data, place value - as a value for that filed
You can alter the Over accordingly for your requirements
*/

class Innings {
    constructor() {
        this.teamName = '';
        this.teamRuns = 0;
        this.extras = 0;
        this.teamOversArray = [];
        this.wickets = 0;
        this.overs = 0;
        this.recentOverValidBalls = 0;
    }
    playInnings = (extraRuns, noOfOvers, currentInningsCount, recentInnRuns, teamSize) => {
        for (let overs = 0; overs < noOfOvers; overs++) {
            let over = new Over();
            console.log('Starting over', overs + 1, 'of', currentInningsCount + 1, 'Innings..');
            over.extras = extraRuns;
            while (over.validBallsCount < 6) {
                let input = prompt()?.toUpperCase();
                if (input === Constants.WICKET) { this.wickets++; }
                over.handleInput(input);
                if (currentInningsCount > 0 && this.teamRuns + over.runs > recentInnRuns) {
                    break;
                }
                if (this.wickets === teamSize - 1) {
                    console.log();
                    console.log('All OUT!!!\n');
                    break;
                }
            }
            this.recentOverValidBalls = over.validBallsCount;
            this.teamRuns += over.runs;
            this.teamOversArray.push(over.overArray);
            this.extras += ((over.extrasCount[Constants.WIDE] * over.extras[Constants.WIDE]) + (over.extrasCount[Constants.NOBALL] * over.extras[Constants.NOBALL]));
            console.log('Type: \n \u2023"CIS" to know current innings statistics\n \u2023Click "ENTER" to resume innings.');
            let matchStatusInput = prompt('').toUpperCase(); if (matchStatusInput === Constants.CURRENTINN) { this.getCurrentInningsStatus(); }
            if (currentInningsCount > 0 && this.teamRuns + over.runs > recentInnRuns) {
                break;
            }
            if (this.wickets === teamSize - 1) {
                break;
            }
        }
        recentInnRuns = this.teamRuns;
        currentInningsCount++;
        console.log(currentInningsCount, 'innings completed.\n');
        return [currentInningsCount, recentInnRuns];
    }
    getCurrentInningsStatus = () => {
        let oversFaced = 0, runRate = 0, overCount = 0, overValidBallCount = 0;
        overCount = this.teamOversArray.length - 1;
        overValidBallCount = this.teamOversArray[overCount].length;
        if (this.recentOverValidBalls === 6) {
            overValidBallCount = 0;
            overCount++;
        }
        //console.log(overValidBallCount, overCount);
        this.overs = overCount + '.' + overValidBallCount;
        oversFaced = Number((overCount + (overValidBallCount / 6)));
        runRate = (this.teamRuns / oversFaced).toFixed(2);
        let data = '+----------------------------------+\n' + '| Team Name    |' + this.teamName + '\n' + '+----------------------------------+\n';
        console.log('+----------------------------------+');
        console.log('| Team Name   |', this.teamName);
        console.log('+----------------------------------+');
        data += '| Runs        | ' + this.teamRuns + '\n+----------------------------------+\n';
        console.log('| Runs        |', this.teamRuns);
        console.log('+----------------------------------+');
        data += '| Overs       | ' + overCount + '.' + overValidBallCount + '\n';
        console.log('| Overs       |', overCount + '.' + overValidBallCount);
        data += '+----------------------------------+\n' + '| Wickets     | ' + this.wickets + '\n' + '+----------------------------------+\n';
        console.log('+----------------------------------+');
        console.log('| Wickets     |', this.wickets);
        console.log('+----------------------------------+');
        data += '| Extras      | ' + this.extras + '\n' + '+----------------------------------+\n';
        console.log('| Extras      |', this.extras);
        console.log('+----------------------------------+');
        data += '| Run Rate:   | ' + runRate + '\n' + '+----------------------------------+\n\n';
        console.log('| Run Rate:   |', runRate);
        console.log('+----------------------------------+');
        console.log();
        console.log();
        return data;
    }

}

class Ball {
    constructor() {
        this.ballType = '';
        this.runs = 0;
        this.extraRuns = 0;
    }
}

class Constants {
    static WIDE = 'WIDE';
    static NOBALL = 'N';
    static UNDO = 'UN';
    static EXIT = 'E';
    static RUNS = 'R';
    static GETOVER = 'RO';
    static BALL_DETAILS = 'G';
    static WICKET = 'W';
    static RUNRATE = 'RR';
    static VALID_RUNRATE = 'RRVB';
    static DISPLAY = 'D';
    static WICKET_STR = 'Wicket';
    static VALIDBALL_STR = 'Valid Ball';
    static NOBALL_STR = 'No Ball';
    static WIDE_STR = 'Wide Ball';
    static MATCH_STATUS = 'MS';
    static CURRENTINN = 'CIS';
    static MESSAGE = 'messageToBeDisplayed';
    static TEAMNAME = 'teamName';
    static HEAD = 'HEAD';
    static TAIL = 'TAIL';
    static BAT = 'BAT';
    static BOWL = 'BOWL';
    static FINISHED = 'Match Finished';
}
class Over {

    constructor() {
        this.overArray = [];
        this.ballDetailsArray = [];
        this.validScore = ['0', '1', '2', '3', '4', '6'];
        this.validBallsCount = 0;
        this.runs = 0;
        this.extras = {
            [Constants.WIDE]: 1,
            [Constants.NOBALL]: 1
        }
        this.extrasCount = {
            [Constants.WIDE]: 0,
            [Constants.NOBALL]: 0
        }
    }

    getBallDetails = (ballNumber) => {
        if (ballNumber > this.overArray.length) {
            console.log('Invali Ball Number!!');
        }
        else {
            console.log(this.ballDetailsArray[ballNumber - 1]);
        }
    }

    handleInput = (inputStr) => {
        let invalidFlag = 0;
        if (inputStr === '') {
            console.log('Invalid Command');
            return false;
        }
        inputStr = inputStr.toUpperCase();
        let ball = new Ball();
        if (inputStr === Constants.RUNS) {
            console.log(this.getRuns());
        }
        else if (inputStr === Constants.BALL_DETAILS) {
            let ballNumber = Number(prompt('Enter ball NUmber/index:'));
            this.getBallDetails(ballNumber);
        }
        else if (inputStr === Constants.RUNRATE) {
            console.log(this.getOverallRunRate());
        }
        else if (inputStr === Constants.VALID_RUNRATE) {
            console.log(this.getRunRateForValidBalls());
        }
        else if (inputStr === Constants.GETOVER) {
            console.log(this.getOver());
        }
        else if (inputStr === Constants.UNDO) {
            if (this.validBallsCount === 0) {
                console.log('No balls played till...');
            }
            else {
                this.ballDetailsArray.pop();
                ball.ballType = Constants.UNDO_STR;
                let recentBall = this.overArray.pop();
                if (recentBall.includes(Constants.NOBALL)) {
                    this.runs -= this.extras[Constants.NOBALL];
                    if (recentBall !== Constants.NOBALL) {
                        this.runs -= Number(recentBall.split(Constants.WIDE)[0]);
                    }
                }
                else if (recentBall.includes(Constants.WIDE)) {
                    this.runs -= this.extras[Constants.WIDE];
                    if (recentBall !== Constants.WIDE) {
                        this.runs -= Number(recentBall.split(Constants.WIDE)[0]);
                    }
                }
                else {
                    this.validBallsCount--;
                    if (this.validScore.includes(temp)) {
                        this.runs -= Number(temp);
                    }
                }
            }
        }
        else if (this.validBallsCount === 6) {
            console.log('over finished...you can exit(E) or undo last ball(UN)');
        }
        else if (this.validScore.includes(inputStr)) {
            ball.ballType = Constants.VALIDBALL_STR;
            ball.runs = Number(inputStr);
            this.validBallsCount++;
            this.runs += Number(inputStr);
            this.overArray.push(inputStr);
            if (this.validBallsCount === 6) {
                console.log('over finished...you can exit(E) or undo last ball(UN)');
            }
        }
        else if (inputStr === Constants.WICKET) {
            ball.ballType = Constants.WICKET_STR;
            this.overArray.push(inputStr);
            this.validBallsCount++;
            if (this.validBallsCount === 6) {
                console.log('over finished...you can exit(E) or undo last ball(UN)');
            }
        }
        else if (inputStr === Constants.DISPLAY) {
            this.displayOver();
        }
        else if (inputStr.includes(Constants.WIDE)) {
            this.extrasCount[Constants.WIDE]++;
            ball.ballType = Constants.WIDE_STR;
            ball.extraRuns = this.extras[Constants.WIDE];
            this.runs += this.extras[Constants.WIDE];
            if (inputStr !== Constants.WIDE) {
                this.runs += Number(inputStr.split(Constants.WIDE)[0]);
                ball.runs = Number(inputStr.split(Constants.WIDE)[0]);
            }
            this.overArray.push(inputStr);
        }

        else if (inputStr.includes(Constants.NOBALL)) {
            this.extrasCount[Constants.NOBALL]++;
            ball.ballType = Constants.NOBALL_STR;
            ball.extraRuns = this.extras[Constants.NOBALL];
            this.runs += this.extras[Constants.NOBALL];
            this.overArray.push(inputStr);
            if (inputStr !== Constants.NOBALL) {
                ball.runs = Number(inputStr.split(Constants.NOBALL)[0]);
                this.runs += Number(inputStr.split(Constants.NOBALL)[0]);
            }
        }
        else {
            invalidFlag = 1;
            console.log('Invalid Command');
        }
        if (invalidFlag === 0 && inputStr !== Constants.UNDO) { this.ballDetailsArray.push(ball); }

    }

    getRunRateForValidBalls = () => {
        return this.runs / this.validBallsCount || 0;

    }

    getOverallRunRate = () => {
        return (this.runs / this.overArray.length) || 0;
    }

    getRuns = () => {
        return this.runs;

    }

    getOver = () => {
        return this.overArray;
    }

    displayOver = () => {
        let ballCount = 0;
        let sufix = 'th';
        for (let ball of this.overArray) {
            sufix = 'th';
            ballCount++;
            if (ballCount == 1) {
                sufix = 'st';
            }
            else if (ballCount == 2) {
                sufix = 'nd';
            }
            else if (ballCount == 3) {
                sufix = 'rd';
            }
            if (this.validScore.includes(ball)) {
                console.log(ballCount + sufix, 'ball score is', ball);
            }
            else if (ball === Constants.WICKET) {
                console.log(ballCount + sufix, 'ball is Wicket');
            }
            else if (ball === Constants.NOBALL) {
                console.log(ballCount + sufix, 'is Noball with score 0');
            }
            else if (ball.includes(Constants.NOBALL)) {
                console.log(ballCount + sufix, 'is NOball with score', ball[0]);
            }
            else {
                if (ball === Constants.WIDE) {
                    console.log(ballCount + sufix, 'is Wideball with score 1');
                }
                else {
                    console.log(ballCount + sufix, 'is Wideball with score', ball[0]);
                }
            }
        }

    }
}

const prompt = require('prompt-sync')();
class Match {
    constructor() {
        this.noOfOvers = 0;
        this.team1Name = '';
        this.team2Name = '';
        this.extraRuns = {
            [Constants.WIDE]: 0,
            [Constants.NOBALL]: 0
        }
        this.team1Size = -1;
        this.team2Size = -1;
        this.matchStatus = 'Match not yet Started';
        this.recentInnRuns = 0;
        this.winTeamData = { [Constants.TEAMNAME]: '', [Constants.MESSAGE]: '' };
        this.firstInn = new Innings();
        this.secondInn = new Innings();
        this.currentInningsCount = 0;
        this.getInput();
    }

    validTeam = (size) => {
        if (size >= 5 && size < 12 && isNaN(size) === false) {
            return true;
        }
        else if (isNaN(size) === true) { console.log('Only Numerics allowed!!!'); }
        return false;
    }

    getInput = () => {
        this.noOfOvers = Number(prompt('Enter total number of overs:'));
        while (this.noOfOvers <= 0 || isNaN(this.noOfOvers)) {
            console.log('Please enter Numerical value..\n');
            this.noOfOvers = Number(prompt('Enter total number of overs:'));
        }
        this.team1Name = prompt('Enter Team 1 Name:');
        if (this.team1Name === '') { this.team1Name = 'untitled1' };
        this.team1Size = Number(prompt('Enter Team 1 size:'));
        while (this.team1Size <= 0 || isNaN(this.team1Size)) {
            console.log('Please enter Numerical value..\n');
            this.team1Size = Number(prompt('Enter Team 1 size:'));
        }
        this.team2Name = prompt('Enter Team 2 Name:');
        if (this.team2Name === '') { this.team2Name = 'untitled2' };
        this.team2Size = Number(prompt('Enter Team 2 size:'));
        while (this.team2Size <= 0 || isNaN(this.team2Size)) {
            console.log('Please enter Numerical value..\n');
            this.team2Size = Number(prompt('Enter Team 2 size:'));
        }
        while (this.team1Size !== this.team2Size || !this.validTeam(this.team1Size)) {
            console.log('\nTeam sizes did not match!!!....\n \u2023provide teams with same size\n \u2023team range is of 5-11 members\n \u2023Only Numerics allowed!!!');
            this.team1Size = Number(prompt('Enter Team 1 size:'));
            this.team2Size = Number(prompt('Enter Team 2 size:'));
        }
        this.extraRuns[Constants.WIDE] = Number(prompt('Enter extra runs for Wide ball:'));
        while (this.extraRuns[Constants.WIDE] < 0 || isNaN(this.extraRuns[Constants.WIDE])) {
            console.log('Please enter Numerical value..');
            this.extraRuns[Constants.WIDE] = Number(prompt('Enter extra runs for Wide ball:'));
        }
        this.extraRuns[Constants.NOBALL] = Number(prompt('Enter extra runs for No ball:'));
        while (this.extraRuns[Constants.NOBALL] < 0 || isNaN(this.extraRuns[Constants.NOBALL])) {
            console.log('Please enter Numerical value..');
            this.extraRuns[Constants.NOBALL] = Number(prompt('Enter extra runs for No ball:'));
        }
        console.log('Starting the match...')
        this.startMatch();
    }

    startMatch() {
        console.log(this.team1Name + ' : what do you want..Head or Tail??');
        let teamsArray = [this.team1Name,this.team2Name];
        let team1TossValue = prompt().toUpperCase();
        while (team1TossValue !== Constants.HEAD && team1TossValue !== Constants.TAIL) {
            console.log();
            console.log('Invalid Command!!!');
            console.log(this.team1Name + ' : what do you want..Head or Tail??');
            team1TossValue = prompt().toUpperCase();
        }
        console.log();
        let tossValues = [Constants.HEAD, Constants.TAIL];
        let generatedToss = tossValues[Math.floor(Math.random() * tossValues.length)];
        let tossWonTeam = '';
        if (team1TossValue === generatedToss) {
            tossWonTeam = teamsArray.shift();
        }
        else {
            tossWonTeam = teamsArray.pop();
        }
        console.log(tossWonTeam + ': Do yo want to opt for Bat/Bowl??');
        let decision = prompt().toUpperCase();
        while (decision !== Constants.BAT && decision !== Constants.BOWL) {
            console.log('\nInvalid Command!!!');
            console.log(tossWonTeam + ': Do yo want to opt for Bat/Bowl??');
            decision = prompt().toUpperCase();
        }
        console.log();
        if (decision === Constants.BAT) {
            this.firstInn.teamName = tossWonTeam;
            this.secondInn.teamName = teamsArray.pop();
        }
        else {
            this.firstInn.teamName = teamsArray.pop();
            this.secondInn.teamName = tossWonTeam;
        }
        console.log(tossWonTeam, 'won the toss and opt to', decision);
        console.log();

        this.matchStatus = 'Match in Progress...';
        let result = this.firstInn.playInnings(this.extraRuns, this.noOfOvers, this.currentInningsCount, this.recentInnRuns, this.team1Size);
        this.currentInningsCount = result[0];
        this.recentInnRuns = result[1];
        result = this.secondInn.playInnings(this.extraRuns, this.noOfOvers, this.currentInningsCount, this.recentInnRuns, this.team1Size);
        this.currentInningsCount = result[0];
        this.recentInnRuns = result[1];
        this.declareResults();
    }

    declareResults = () => {
        this.matchStatus = Constants.FINISHED;
        if (this.secondInn.teamRuns > this.firstInn.teamRuns) {
            this.winTeamData[Constants.TEAMNAME] = this.secondInn.teamName;
            if (this.secondInn.wickets >= this.firstInn.wickets) {
                this.winTeamData[Constants.MESSAGE] = (this.secondInn.teamName + ' won by ' + (this.secondInn.teamRuns - this.firstInn.teamRuns) + ' Runs.');
            }
            else {
                this.winTeamData[Constants.MESSAGE] = (this.secondInn.teamName + ' won by ' + (this.firstInn.wickets - this.secondInn.wickets) + ' Wickets.');
            }
        }
        else {
            if (this.firstInn.teamRuns === this.secondInn.teamRuns) {
                this.winTeamData[Constants.MESSAGE] = 'Draw Match!!!';
            }
            else {
                this.winTeamData[Constants.TEAMNAME] = this.firstInn.teamName;
                this.winTeamData[Constants.MESSAGE] = (this.firstInn.teamName + ' won by ' + (this.firstInn.teamRuns - this.secondInn.teamRuns) + ' Runs.');
            }
        }
        this.getMatchStatus();
    }

    getMatchStatus = () => {
        const fs = require('fs');
        let data = '+----------------------------------+\n|          Match Statistics        |\n+----------------------------------+\n';
        console.log('+----------------------------------+');
        console.log('|          Match Statistics        |');
        console.log('+----------------------------------+');
        if (this.matchStatus === Constants.FINISHED) {
            console.log('|', this.winTeamData[Constants.MESSAGE] + '   |');
            data += ('| ' + this.winTeamData[Constants.MESSAGE] + '   |\n');
        }
        else if (this.matchStatus === 0) {
            console.log('|   ', this.matchStatus + '      |');
            data += '|   ', this.matchStatus + '      |\n';
        }
        data += '+----------------------------------+\n' + '|     ' + this.noOfOvers + ' overs match     |\n' + '+----------------------------------+\n\n';
        console.log('+----------------------------------+');
        console.log('|     ', this.noOfOvers, 'overs match     |');
        console.log('+----------------------------------+');
        console.log();
        data += this.firstInn.getCurrentInningsStatus();
        data += this.secondInn.getCurrentInningsStatus();
        fs.writeFileSync('Statistics.txt', data);
    }

}

const match = new Match();