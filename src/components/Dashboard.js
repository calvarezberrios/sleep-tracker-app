// Updated Dashboard.js with responsive layout
import React, { useEffect, useMemo } from 'react';
import styled from "styled-components";
import EntryCard from './EntryCard';
import { useSelector, useDispatch } from 'react-redux';
import { getEntries } from '../actions/entry-actions';
import SleepChart from './SleepChart';
import moment from "moment";
import SleepScoreCard from './SleepScoreCard';
import SleepScheduleBar from './SleepScheduleBar';

const Dashboard = () => {
    const { entries, error } = useSelector(state => state.entriesReducer);
    const { user } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser")) {
            dispatch(getEntries());
        }
    }, [dispatch]);

    const last7Days = useMemo(() => {
        const today = moment().endOf("day");
        const sevenDaysAgo = moment().startOf("day").subtract(6, "days");

        const filtered = entries.filter(entry => moment(entry.sleep_start).isBetween(sevenDaysAgo, today, null, []));
        return filtered;
    }, [entries]);

    const latestEntry = useMemo(() => {
        if (!entries || entries.length === 0) return null;

        return entries.reduce((latest, entry) => moment(entry.sleep_start).isAfter(moment(latest.sleep_start)) ? entry : latest);
    }, [entries]);

    if (!user || error) {
        return <p>{error?.message || "No login detected. Please log in and try again."}</p>;
    }

    return (
        <DashboardGrid>
            <Row>
                <ScoreCardContainer>
                    <SleepScoreCard data={last7Days} />
                </ScoreCardContainer>
                <DurationChartContainer>
                    <SleepChart data={last7Days} />
                </DurationChartContainer>
            </Row>
            <Row>
                <ScheduleBarContainer>
                    <SleepScheduleBar data={last7Days} />
                </ScheduleBarContainer>
                <SleepEntryContainer>
                    {latestEntry && <EntryCard key={latestEntry.id} {...latestEntry} />}
                </SleepEntryContainer>
            </Row>
        </DashboardGrid>
    );
};

export default Dashboard;

// Styled Components
const DashboardGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 1100px;
    margin: auto;
    padding: 1rem;
`;

const Row = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ScoreCardContainer = styled.div`
    flex: 1;
    min-width: 260px;
    max-width: 100%;
`;

const DurationChartContainer = styled.div`
    flex: 2;
    min-width: 300px;
    max-width: 100%;
`;

const ScheduleBarContainer = styled.div`
    flex: 1;
    min-width: 260px;
    max-width: 100%;
`;

const SleepEntryContainer = styled.div`
    flex: 1;
    min-width: 260px;
    max-width: 100%;
`;
