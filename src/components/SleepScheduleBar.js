import React from 'react';
import styled from 'styled-components';
import moment from "moment";

const ScheduleCard = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 300px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #333;
  font-size: 1.5rem;
`;

const Timeline = styled.div`
  position: relative;
  height: 50px;
  background: #eee;
  border-radius: 12px;
  overflow: hidden;
  margin: 2.5rem 0;
`;

const SleepBlock = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to right, #b8a8ff, #3b82f6);
`;

const TimeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: #666;
`;

const SleepScheduleBar = ({ data }) => {

    const getAverageSleepSchedule =  () => {
        const recent = data;

        if (recent.length === 0) return {avgStart: 0, avgEnd: 0};

        // Convert sleep start/end to minutes from 8 PM
        const minutesFrom8PM = (dateStr) => {
            const dt = moment(dateStr);
            const base = moment(dt).set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
            let diff = dt.diff(base, 'minutes');
            if (diff < 0) diff += 1440; // normalize across midnight
            return diff;
        };

        let totalStart = 0;
        let totalEnd = 0;

        recent.forEach(entry => {
            totalStart += minutesFrom8PM(entry.sleep_start);
            totalEnd += minutesFrom8PM(entry.sleep_end);
        });

        const avgStart = totalStart / recent.length;
        const avgEnd = totalEnd / recent.length;

        return { avgStart, avgEnd }; // in minutes from 8 PM
    }

    const { avgStart, avgEnd } = getAverageSleepSchedule();

    const totalRange = 12 * 60; // 12 hours = 720 minutes (8PM - 8AM)

    const leftPercent = (avgStart / totalRange) * 100;
    const widthPercent = ((avgEnd - avgStart) / totalRange) * 100;

    return (
        <ScheduleCard>
        <Header>
            <div>Sleep Schedule</div>
            <div style={{ fontSize: '0.9rem', color: '#888' }}>Last 7 Days</div>
        </Header>

        <Timeline>
            <SleepBlock
            style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
            }}
            />
        </Timeline>

        <TimeLabels>
            <span>8 PM</span>
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
        </TimeLabels>
        </ScheduleCard>
    );
};

export default SleepScheduleBar;
