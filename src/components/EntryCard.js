import React from 'react';
import styled from "styled-components";
import Moment from "moment";
import { useHistory } from 'react-router-dom';


const EntryCard = props => {
    const {push} = useHistory();

    return (
        <Card onClick = {() => push(`/sleep/${props.id}`)}>
            <LeftContent>
                <h5>{Moment(props.sleep_start).format("MM/DD")} - {Moment(props.sleep_end).format("MM/DD")}</h5>
                <p>{formatTotalTime(props.sleep_time_total)}</p>
            </LeftContent>
            <RightContent>
                <h5>{Moment(props.sleep_start).format("LT")} - {Moment(props.sleep_end).format("LT")}</h5>
            </RightContent>
        </Card>
    );
};

export default EntryCard;


/* Styled Components CSS */
const Card = styled.div`
    width: 446px;
    height: 160px;
    display: flex;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    padding: 0 16px;
    margin: 12px 0;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;

const LeftContent = styled.div`
    width: 50%;
    text-align: left;
    font-size: 16px;
`;

const RightContent = styled.div`
    width: 50%;
    text-align: right;
    font-size: 16px;
`;
/* End of Styled Components CSS */


/* Functions */
const formatTotalTime = (decimalTime) => {
    const msTime = decimalTime * 60 * 60;
    const hours = Math.floor(msTime / (60 * 60));
    let minutes = Math.floor((msTime - (hours * 60 * 60)) / 60);

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hours} hr ${minutes} min`;
}