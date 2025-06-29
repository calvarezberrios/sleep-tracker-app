import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import moment from "moment";
import * as Icons from "@mui/icons-material";
import * as Custom from "../styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { getEntryById } from '../actions/entry-actions';
import useForm from '../hooks/useForm';
import MoodSelector from '../styled-components/MoodSelector';


const EntryPage = ({match}) => {
    
    const {entry, isFetching, error} = useSelector(state => state.entriesReducer);
    const dispatch = useDispatch();

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
        dispatch(getEntryById(match.params.id));
        
    }, []);
    
    useEffect(() => {
        if (entry) {
            setEntryValues({
                sleep_start: moment(entry.sleep_start).format("YYYY-MM-DDTHH:mm"),
                sleep_end: moment(entry.sleep_end).format("YYYY-MM-DDTHH:mm")
            });

            setMoods({
                before_sleep: entry.moods.before_sleep || 0,
                after_sleep: entry.moods.after_sleep || 0,
                daytime: entry.moods?.daytime || 0
            });
        }
    }, [entry, setEntryValues]);

    return (
        <EntryForm>
            <FormHeader>
                <h2>Edit Entry</h2>
                <Custom.IconButton onClick={e => e.preventDefault()}><Icons.Delete /></Custom.IconButton>
            </FormHeader>

            <FormSection>
                <h5>Sleep Start</h5>
                <Custom.TextField 
                    id = "sleep_start"
                    type = "datetime-local"
                    name = "sleep_start"
                    value = {entryValues.sleep_start}
                    onChange = {handleChanges}
                />

                <MoodSelector name = "sleep_start" value = { moods.before_sleep } moods = { moods } setMoods = { setMoods } />
                
            </FormSection>

            <FormSection>
                <h5>Sleep End</h5>
                <Custom.TextField 
                    id = "sleep_end"
                    type = "datetime-local"
                    name = "sleep_end"
                    value = {entryValues.sleep_end}
                    onChange = {handleChanges}
                />
                

                <MoodSelector name = "sleep_end" value = {moods.after_sleep} moods = { moods } setMoods = { setMoods } />
                
            </FormSection>

            <FormSection>
                <h5>Daily Mood</h5>
                <br /><br />

                <MoodSelector name = "daytime" value = {moods.daytime} moods = { moods } setMoods = { setMoods } />
                
            </FormSection>

            <Custom.Button onClick={e => e.preventDefault()}>Save</Custom.Button>
            
        </EntryForm>
    );
};

export default EntryPage;



/* Styled Components CSS */

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




/* End of Styled Components CSS */