import React from 'react';
import styled from "styled-components";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";
import { useHistory } from 'react-router-dom';

const moodMap = {
    1: '😞',
    2: '😐',
    3: '🙂',
    4: '😄', 
}

const EntryCard = props => {
    const { push } = useHistory();    

    const timeTotal = () => {
        const hours = Math.floor(props.sleep_time_total);
        const minutes = Math.round((props.sleep_time_total - hours) * 60);
        return hours + " h " + minutes + " m ";
    }

    return (
        <Card>
            <Row>
                <Label style = {{fontSize: "1.2rem"}}>Start Date</Label>
                <Value>{moment(props.sleep_start).format("M/D/yyyy hh:mm A")}</Value>                       
            </Row>
            <RowDivider />
            <Row>                
                <Label style = {{fontSize: "1.2rem"}}>End Date</Label>
                <Value>{moment(props.sleep_end).format("M/D/yyyy hh:mm A")}</Value>                
            </Row>
            <RowDivider />
            <MoodRow>
                <MoodItem>
                    <Label>Daytime Mood</Label>
                    <MoodIcon>{moodMap[props.moods.daytime]}</MoodIcon>
                </MoodItem>
                <MoodDivider />
                <MoodItem>
                    <Label>Sleep Start Mood</Label>
                    <MoodIcon>{moodMap[props.moods.before_sleep]}</MoodIcon>
                </MoodItem>
                <MoodDivider />
                <MoodItem>
                    <Label>Sleep End Mood</Label>
                    <MoodIcon>{moodMap[props.moods.after_sleep]}</MoodIcon>
                </MoodItem>
            </MoodRow>
            <RowDivider />

            <Footer>
                <ClockIcon />
                <div>
                    <TotalLabel>Sleep Time Total</TotalLabel>
                    <TotalValue>{timeTotal()}</TotalValue>
                </div>
            </Footer>
        </Card>
    );
};

export default EntryCard;


/* Styled Components CSS */
const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 100%;
  height: 300px;
  font-family: 'Arial', sans-serif;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
`;

const RowDivider = styled.div`
    display: block;
    border-bottom: 1px solid #ddd;
`;

const MoodRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  text-align: center;

`;

const MoodItem = styled.div`
  
`;

const MoodIcon = styled.div`
    margin-top: 0.7rem;
    font-size: 2.2rem;
`;

const MoodDivider = styled.div`
    display: block;
    border-left: 1px solid #ddd;
`;


const Label = styled.div`
  font-size: 0.9rem;
  color: #000;
`;

const Value = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1rem;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ClockIcon = styled(FaRegClock)`
  margin-right: 0.7rem;
  color: #3e95d8;
  font-size: 2rem
`;

const TotalLabel = styled.div`
    color: #000;
    font-Weight: 500;
`;

const TotalValue = styled.div`
    color: #000;
    font-Weight: 500;
`;