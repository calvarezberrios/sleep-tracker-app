import React, { useEffect } from 'react';
import { TextContainer, EntriesContainer } from '../styled-components';
import EntryCard from './EntryCard';
import { useSelector, useDispatch } from 'react-redux';
import { getEntries } from '../actions/entry-actions';

const Dashboard = () => {
    const {entries, isFetching, error} = useSelector(state => state.entriesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEntries());
    }, [dispatch]);
    
    return (
        <>
            <TextContainer>
                <h3>Hours Slept</h3>
            </TextContainer>

            <EntriesContainer>
                <h5>Sleep Entries</h5>
                {entries.map(entry => <EntryCard key = {entry.id} {...entry} />)}
            </EntriesContainer>
        </>
    );
};

export default Dashboard;