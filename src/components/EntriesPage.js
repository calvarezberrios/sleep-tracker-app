import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getEntries } from '../actions/entry-actions';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import * as Custom from '../styled-components';
import EntryCard from './EntryCard';

const moodMap = {
    1: '😞',
    2: '😐',
    3: '🙂',
    4: '😄', 
}

const HistoryPage = () => {
  const { entries, isFetching, error } = useSelector(state => state.entriesReducer);
  const dispatch = useDispatch();
  useEffect(() => {         
    dispatch(getEntries());
  }, [dispatch]);


  if(error) {
      return <p>{error?.message}</p>;
    }

  return (
    <Container>
      <Header>Sleep History</Header>

        {isFetching && <p>Loading...</p>}
        {error && <ErrorText>{error}</ErrorText>}

        {!isFetching && entries.length === 0 && <p>No entries found. Check your log in and try again</p>}
        {!isFetching &&
            <Entries>
                {[...entries].reverse().map(entry => (
                <EntryCard key={entry.id} {...entry} isHistory={true} />
            
                ))}

            </Entries>
        }
    </Container>
  );
};

export default HistoryPage;

const Container = styled.div`
  width: 500px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;



const Entries = styled.div`
    display: flex;
    flex-direction: column;
    & > div {
        margin-bottom: 1rem;
    }
    overflow: auto;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;
