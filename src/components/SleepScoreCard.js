import React from 'react';
import styled from 'styled-components';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ScoreCard = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 350px;
`;

const ScoreLabel = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
`;

const ScoreInnerText = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
`;

const ScoreSubLabel = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #666;
`;

const SleepScoreCard = ({ data }) => {
    const score = () => {
        if(data.length === 0) return 0;

        let totalHours = 0;
        let totalMood = 0;
        let moodCount = 0;

        data.forEach(entry => {
            totalHours += entry.sleep_time_total;

            if (entry.sleep_start_mood) {
                totalMood += entry.sleep_start_mood;
                moodCount++;
            }

            if (entry.sleep_end_mood) {
                totalMood += entry.sleep_end_mood;
                moodCount++;
            }

            if (entry.daytime_mood) {
                totalMood += entry.daytime_mood;
                moodCount++;
            }
        });

        const avgSleepPerNight = totalHours / data.length;
        const sleepTimeScore = Math.min((avgSleepPerNight / 8) * 40, 40);

        const avgMood = moodCount > 0 ? totalMood / moodCount : 1;
        const moodScore = ((avgMood - 1) / 3) * 60;

        const sleepScore = Math.round(sleepTimeScore + moodScore);

        return sleepScore;

    };
    return (
        <ScoreCard>
        <CircularProgressbarWithChildren
            value={score()}
            maxValue={100}
            circleRatio={0.75} // shows 75% of the circle (bottom is open)
            styles={buildStyles({
            rotation: 0.625, // rotate so opening is at the bottom (270 degrees)
            strokeLinecap: 'round',
            pathColor: 'url(#gradient)',
            trailColor: '#eee',
            })}
        >
            {/* Gradient Def */}
            <svg style={{ height: 0 }}>
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#00BFFF" />
                </linearGradient>
            </defs>
            </svg>

            {/* Score Text */}
            <ScoreInnerText>{score()}</ScoreInnerText>
            <ScoreSubLabel>Last 7 Days</ScoreSubLabel>
        </CircularProgressbarWithChildren>
        <ScoreLabel>Sleep Score</ScoreLabel>
        </ScoreCard>
    );
};

export default SleepScoreCard;
