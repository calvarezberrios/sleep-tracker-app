import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Moment from "moment";
import * as Icons from "@material-ui/icons";
import * as Custom from "../styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { getEntryById } from '../actions/entry-actions';
import useForm from '../hooks/useForm';


const EntryPage = ({match}) => {
    //console.log(match.params.id)
    const {entry, isFetching, error} = useSelector(state => state.entriesReducer);
    const dispatch = useDispatch();
    const [entryValues, handleChanges] = useForm({
        start_date: entry ? Moment(entry.sleep_start).format("MM/DD/YYYY") : "",
        start_time: entry ? Moment(entry.sleep_start).format("LT") : "",
        end_date: entry ? Moment(entry.sleep_end).format("MM/DD/YYYY"): "",
        end_time: entry ? Moment(entry.sleep_end).format("LT") : ""
    });
    const [moods, setMoods] = useState({
        before_sleep: entry ? entry.moods.before_sleep : "",
        after_sleep: entry ? entry.moods.after_sleep : "",
        daytime: entry ? entry.moods.daytime : ""
    });

    useEffect(() => {
        dispatch(getEntryById(match.params.id));
    }, [dispatch, match.params.id]);
    
    console.log(entry)
    return (
        <EntryForm>
            <FormHeader>
                <h2>Edit Entry</h2>
                <Custom.IconButton><Icons.Delete /></Custom.IconButton>
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

                <MoodIcons>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfiedOutlined />    
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfiedOutlined />    
                    </Custom.IconButton>
                </MoodIcons>
                
            </FormSection>

            <FormSection>
                <h5>Sleep End</h5>
                <DatetimeFields>
                    <Custom.TextField 
                        id = "end_date"
                        type = "date"
                        name = "end_date"
                        value = {entryValues.end_date}
                        onChange = {handleChanges}
                    />
                    <Custom.TextField 
                        id = "end_time"
                        type = "time"
                        name = "end_time"
                        value = {entryValues.end_time}
                        onChange = {handleChanges}
                    />
                </DatetimeFields>

                <MoodIcons>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfiedOutlined />    
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfiedOutlined />    
                    </Custom.IconButton>
                </MoodIcons>
                
            </FormSection>

            <FormSection>
                <h5>Daily Mood</h5>
                <br /><br />

                <MoodIcons>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfiedOutlined />    
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentDissatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfied />
                    </Custom.IconButton>
                    <Custom.IconButton>
                        <Icons.SentimentSatisfiedOutlined />    
                    </Custom.IconButton>
                </MoodIcons>
                
            </FormSection>

            <Custom.Button>Save</Custom.Button>
            
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
    height: 175px;
    padding: 16px;
    margin-bottom: 30px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);

    h5 {
        font-size: 18px;
        margin: 0;
    }
`;

const DatetimeFields = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        width: 49%;
        background: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }

    input:last-child {
        width: 25%;
    }
`;

const MoodIcons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        width: 50px;
        height: 50px;
        margin: 0 10px;

        svg {
            width: 50px;
            height: 50px;
        }
    }
`;

/* End of Styled Components CSS */