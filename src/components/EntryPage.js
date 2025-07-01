import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import moment from 'moment';
import * as Icons from '@mui/icons-material';
import * as Custom from '../styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addNewEntry, deleteEntry, getEntries, getEntryById, saveEntry } from '../actions/entry-actions';
import useForm from '../hooks/useForm';
import MoodSelector from '../styled-components/MoodSelector';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const EntryPage = ({ match }) => {
  const { entry, isFetching, error } = useSelector(state => state.entriesReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [isDirty, setIsDirty] = useState(false);
  const [open, setOpen] = useState(false);

  const [entryValues, handleChanges, setEntryValues] = useForm({
    sleep_start: "",
    sleep_end: ""
  });

  const [moods, setMoods] = useState({
    before_sleep: 0,
    after_sleep: 0,
    daytime: 0
  });

  useEffect(() => {
    if (match.params.id && match.params.id !== "new") {
      dispatch(getEntryById(match.params.id));
    }

    if(match.params.id === "new") {
        setEntryValues({
            sleep_start: "",
            sleep_end: ""
        });

        setMoods({
            before_sleep: 0,
            after_sleep: 0,
            daytime: 0
        });
    }
  }, [dispatch, match.params.id, setEntryValues, setMoods]);

  useEffect(() => {
    if (entry) {
      const sleepStart = moment(entry.sleep_start);
      const sleepEnd = moment(entry.sleep_end);

      setEntryValues({
        sleep_start: sleepStart.isValid() ? sleepStart.format('YYYY-MM-DDTHH:mm') : '',
        sleep_end: sleepEnd.isValid() ? sleepEnd.format('YYYY-MM-DDTHH:mm') : ''
      });

      setMoods({
        before_sleep: entry.moods?.before_sleep || 0,
        after_sleep: entry.moods?.after_sleep || 0,
        daytime: entry.moods?.daytime || 0
      });
    }
  }, [entry, setEntryValues]);

  useEffect(() => {
    if (!entry) return;

    const original = {
      sleep_start: moment(entry.sleep_start).format('YYYY-MM-DDTHH:mm'),
      sleep_end: moment(entry.sleep_end).format('YYYY-MM-DDTHH:mm'),
      before_sleep: entry.moods?.before_sleep || 0,
      after_sleep: entry.moods?.after_sleep || 0,
      daytime: entry.moods?.daytime || 0
    };

    const current = {
      sleep_start: entryValues.sleep_start,
      sleep_end: entryValues.sleep_end,
      before_sleep: moods.before_sleep,
      after_sleep: moods.after_sleep,
      daytime: moods.daytime
    };
    const hasChanged = Object.keys(original).some(key => original[key] !== current[key]);
    setIsDirty(hasChanged);
  }, [entry, entryValues, moods]);

  const handleBack = e => {
    e.preventDefault();
    push('/history');
  };

  const handleSave = async e => {
    e.preventDefault();

    const entryToEdit = {
      sleep_start: moment(entryValues.sleep_start).toISOString(),
      sleep_end: moment(entryValues.sleep_end).toISOString(),
      moods: { ...moods }
    };

    if (match.params.id && match.params.id !== "new") {
      dispatch(saveEntry(match.params.id, entryToEdit));
    }
    if(match.params.id === "new") {
        const newEntry = await dispatch(addNewEntry(entryToEdit));
        push(`/sleep/${newEntry.id}`);
    }

  };

  const handleDelete = () => {   
    if(match.params.id !== "new") { 
        dispatch(deleteEntry(match.params.id));
        dispatch(getEntries());
        push("/history");
    }
  }

  if (isFetching) {
    
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  } 

  return (
    <EntryForm>
      <FormHeader>
        <h2>{match.params.id === "new" ? "New" : "Edit"} Entry</h2>
        {match.params.id !== "new" &&
            <Custom.IconButton onClick={e => {e.preventDefault(); setOpen(true)}}>
            <Icons.Delete />
            </Custom.IconButton>
        }
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this Sleep Entry?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
      </FormHeader>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <FormSection>
        <h5>Sleep Start</h5>
        <Custom.TextField
          id="sleep_start"
          type="datetime-local"
          name="sleep_start"
          value={entryValues.sleep_start}
          onChange={handleChanges}
        />
        <MoodSelector
          name="before_sleep"
          value={moods.before_sleep}
          moods={moods}
          setMoods={setMoods}
        />
      </FormSection>

      <FormSection>
        <h5>Sleep End</h5>
        <Custom.TextField
          id="sleep_end"
          type="datetime-local"
          name="sleep_end"
          value={entryValues.sleep_end}
          onChange={handleChanges}
        />
        <MoodSelector
          name="after_sleep"
          value={moods.after_sleep}
          moods={moods}
          setMoods={setMoods}
        />
      </FormSection>

      <FormSection>
        <h5>Daily Mood</h5>
        <br />
        <MoodSelector
          name="daytime"
          value={moods.daytime}
          moods={moods}
          setMoods={setMoods}
        />
      </FormSection>

      <ButtonSection>
        <Custom.Button onClick={handleBack}>Back</Custom.Button>
        <Custom.Button onClick={handleSave} disabled={!isDirty && match.params.id !== "new"}>
          Save
        </Custom.Button>
      </ButtonSection>
    </EntryForm>
  );
};

export default EntryPage;

/* Styled Components */

const EntryForm = styled.form`
  width: 448px;
  margin: 0 auto;
  text-align: center;

  button {
    margin-top: 10px;
  }
`;

const FormHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 50px;
`;

const FormSection = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 30px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);

  h5 {
    font-size: 18px;
    margin: 0;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

