import styled from "styled-components";

/* Page Layout */
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  gap: 4rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }
`;

/* Header Text */
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

  @media (max-width: 1024px) {
    width: 70%;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 18px;

    h2 {
      font-size: 36px;
    }
  }
`;


/* Form Section */
const FormContainer = styled.form`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 15%;

  @media (max-width: 1024px) {
    width: 70%;
    align-items: center;
    padding: 0;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 0;
  }
`;

/* Input */
const TextField = styled.input`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "56px"};
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

/* Name Fields Row */
const NameInputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

/* Password Input Group */
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

/* Submit Button */
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

  &:disabled {
    background: #777;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

/* Icon Buttons */
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

/* Entries Scroll Area */
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
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* Small Utility Button */
const ButtonSmall = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export {
  PageContainer,
  TextContainer,
  FormContainer,
  TextField,
  PasswordField,
  Button,
  IconButton,
  NameInputGroup,
  EntriesContainer,
  ButtonSmall
};
