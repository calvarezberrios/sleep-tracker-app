import React, { useEffect, useState } from 'react';
import * as Icons from '@mui/icons-material';
import * as Custom from "../styled-components";
import styled from 'styled-components';

// You can keep your Custom.IconButton, just ensure it passes props correctly
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

const smilies = [
  { id: 1, icon: <Icons.SentimentDissatisfiedOutlined /> },
  { id: 2, icon: <Icons.SentimentDissatisfied /> },
  { id: 3, icon: <Icons.SentimentSatisfied /> },
  { id: 4, icon: <Icons.SentimentSatisfiedOutlined /> },
];

const MoodSelector = ({ name, value, moods, setMoods }) => {
  const [selectedMood, setSelectedMood] = useState(parseInt(value));

  const handleClick = (e, id) => {
    e.preventDefault();
    setSelectedMood(id);
    if(setMoods) setMoods({...moods, [name]: id });
  }

  useEffect(() => {
    setSelectedMood(parseInt(value));
  }, [value])
  return (
    <MoodIcons>
      {smilies.map(({ id, icon }) => (
        <Custom.IconButton
          key={id}
          onClick={(e) => handleClick(e, id)}
          style={{
            color: selectedMood === id ? '#3e95d8' : '#ccc',
            transform: selectedMood === id ? 'scale(1.2)' : 'scale(1)',
            transition: 'all 0.2s ease',
          }}
        >
          {icon}
        </Custom.IconButton>
      ))}
    </MoodIcons>
  );
};

export default MoodSelector;
