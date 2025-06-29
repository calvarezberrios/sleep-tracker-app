import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import moment from "moment";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ChartCard = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  font-size: 1.2rem;
  height: 350px;

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #333;
  font-size: 1.5rem;
  padding-left: 1rem;
`;

const SleepChart = ({ data }) => {
    const chartData = useMemo(() => {        
        const grouped = {};

        data.forEach(entry => {
            const dateKey = moment(entry.sleep_start).format("YYYY-MM-DD");
            if(!grouped[dateKey]) {
                grouped[dateKey] = 0
            }
            grouped[dateKey] +=entry.sleep_time_total;
        });

        return Array.from({ length: 7 }, (_, i) => {
            const day = moment().subtract(6 - i, "days");
            const dateKey = day.format("YYYY-MM-DD");

            return {
                day: day.format("ddd"),
                hours: grouped[dateKey]?.toFixed(2) || 0,
            };
        });

    }, [data]);

    const ticks = useMemo(() => {
        const maxHours = Math.max(...chartData.map(d => d.hours));
        const upper = Math.ceil(maxHours / 2) * 2; // round up to next even
        return Array.from({ length: (upper / 2) + 1 }, (_, i) => i * 2);
    }, [chartData])

    

    return (
    <ChartCard>
        <Header>
        <div>Sleep Duration</div>
        <div style={{ fontSize: '0.9rem', color: '#888' }}>Last 7 days</div>
        </Header>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis
            domain={[0, "auto"]}
            ticks={ticks}
            tickFormatter = {(value) => `${value > 0 ? value + " h" : value}`}
            />
            <Tooltip formatter={(value) => {
                const hours = Math.floor(value);
                const minutes = Math.round((value - hours) * 60);
                return hours + " h " + minutes + " m ";
            }} />
            <Bar dataKey="hours" fill="#3B82F6" radius={[5, 5, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </ChartCard>
  );
};

export default SleepChart;
