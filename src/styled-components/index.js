import styled from "styled-components";


const TextContainer = styled.div`
    font-size: 24px;
    line-height: 27px; 
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h2 {
        font-size: 48px;
        font-weight: bold;
        line-height: 54px;
    }
`;



const FormContainer = styled.form`
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 15%;
`;



const TextField = styled.input`
    width: ${props => props.width ? props.width : "100%"};
    height: ${props => props.height ? props.height : "56px"};
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    border-radius: 8px 8px 0px 0px;
    border: none;
    margin-bottom: 24px;
    padding: 16px;
    color: rgba(255, 255, 255, 0.6);
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), #121212;

    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
        outline: none;
    }
`;

const NameInputGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const PasswordField = styled.div`
    width: 100%;
    height: 56px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), #121212;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 24px;

    input {
        background: none;
        border: none;
        font-size: 16px;
        font-family: 'Inter', sans-serif;
        width: 100%;
        color: rgba(255, 255, 255, 0.6);

        &::placeholder {
            color: rgba(255, 255, 255, 0.6);
            
        }

        &:focus {
            outline: none;
        }
    }
`;

const Button = styled.button`
    margin-top: 50px;
    width: 280px;
    height: 36px;
    font-size: 18px;
    color: #fff;
    font-family: 'Comfortaa', cursive;
    background: #39869D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14);
    border-radius: 18px;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const IconButton = styled.button`
    border-radius: 100px;
    width: 40px;
    height: 40px;
    align-self: center;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const EntriesContainer = styled.div`
    font-size: 24px;
    line-height: 27px; 
    width: 50%;
    max-height: 91.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;

    h2 {
        font-size: 48px;
        font-weight: bold;
        line-height: 54px;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }
    
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }
`;


export {
    TextContainer,
    FormContainer,
    TextField,
    PasswordField,
    Button,
    IconButton,
    NameInputGroup,
    EntriesContainer
};




