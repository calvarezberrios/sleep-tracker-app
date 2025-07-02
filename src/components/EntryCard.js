import React from 'react';
import styled from "styled-components";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { ButtonSmall } from '../styled-components';

const moodMap = {
    1: '😞',
    2: '😐',
    3: '🙂',
    4: '😄',
};

const EntryCard = props => {
    const { push } = useHistory();

    const timeTotal = () => {
        const hours = Math.floor(props.sleep_time_total);
        const minutes = Math.round((props.sleep_time_total - hours) * 60);
        return hours + " h " + minutes + " m ";
    };

    const handleEdit = () => {
        push(`/sleep/${props.id}`);
    };

    return (
        <Card>
            <Row>
                <Label>Start Date</Label>
                <Value>{moment(props.sleep_start).format("M/D/YYYY hh:mm A")}</Value>
            </Row>
            <RowDivider />
            <Row>
                <Label>End Date</Label>
                <Value>{moment(props.sleep_end).format("M/D/YYYY hh:mm A")}</Value>
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
                <div className="left">
                    <ClockIcon />
                    <TotalLabel>Sleep Time Total</TotalLabel>
                </div>
                <div className="right">
                    {props.isHistory && <ButtonSmall onClick={handleEdit}>Edit</ButtonSmall>}
                    <TotalValue>{timeTotal()}</TotalValue>
                </div>
            </Footer>
        </Card>
    );
};

export default EntryCard;

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RowDivider = styled.div`
  border-bottom: 1px solid #ddd;
`;

const Label = styled.div`
  font-size: 1rem;
  color: #000;
`;

const Value = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #555;
  text-align: right;
`;

const MoodRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
`;

const MoodDivider = styled.div`
    display: block;
    border-left: 1px solid #ddd;
`;

const MoodItem = styled.div`
  flex: 1;
  min-width: 100px;
`;

const MoodIcon = styled.div`
  margin-top: 0.5rem;
  font-size: 2.2rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  .left, .right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .right {
    margin-left: auto;
  }
`;

const ClockIcon = styled(FaRegClock)`
  color: #3e95d8;
  font-size: 1.5rem;
`;

const TotalLabel = styled.div`
  color: #000;
  font-weight: 500;
`;

const TotalValue = styled.div`
  color: #000;
  font-weight: 600;
  font-size: 1.1rem;
`;
