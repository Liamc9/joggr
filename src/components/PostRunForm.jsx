import React from "react";
import styled from "styled-components";

import {
  SelectInput,
  DateTimeLocalInput,
  SubmitButton,
  ResetButton,
  FormLogic,
} from "liamc9npm";

// Styled Components
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Default: two columns */
  gap: 32px;
  padding: 32px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
`;

const ButtonContainer = styled.div`
  grid-column: span 2; /* Default: buttons span 2 columns */
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-right: 16px;

`;

const Header = styled.h2`
  grid-column: span 2; /* Header spans all columns */
    text-align: center;
    margin: 16px;
    font-size: 2rem;
    color: #333;
    font-weight: 600;
`;

export default function PostRunForm({ initialFormData = {}, handleFormSubmit }) {
  const defaultData = {
    name: "",
    email: "",
    message: "",
    color: "#000000",
    rating: 3,
    checkbox: false,
    toggle: false,
    role: "designer",
    volume: 3,
  };

  // Merge defaultData with whatever was passed in
  const mergedData = { ...defaultData, ...initialFormData };

  return (
    <div>
      <FormLogic onSubmit={handleFormSubmit} initialData={mergedData}>
        <Header>Post Run</Header>
        <FormContainer>
          <SelectInput
            label="distance"
            name="distance"
            id="distance"
            required
            options={[
              { label: "Please select", value: "" },
              { label: "<5km", value: "<5km" },
              { label: "5-10km", value: "5-10km" },
              { label: ">10km", value: ">10km" },
            ]}
          />
          <SelectInput
            label="pace"
            name="pace"
            id="pace"
            required
            options={[
              { label: "Please select (min/km)", value: "" },
              { label: "3:00 - 3:30", value: "3:00 - 3:30" },
              { label: "3:30 - 4:00", value: "3:30 - 4:00" },
              { label: "4:00 - 4:30", value: "4:00 - 4:30" },
              { label: "4:30 - 5:00", value: "4:30 - 5:00" },
              { label: "5:00 - 5:30", value: "5:00 - 5:30" },
              { label: "5:30 - 6:00", value: "5:30 - 6:00" },
              { label: "6:00 - 6:30", value: "6:00 - 6:30" },
              { label: "6:30 - 7:00", value: "6:30 - 7:00" },
              { label: "7:00 - 7:30", value: "7:00 - 7:30" },
              { label: "7:30 - 8:00", value: "7:30 - 8:00" },
            ]}
          />
          <DateTimeLocalInput  
                label="When"
                name="when"
                id="when"
                required
                min="2023-01-01T00:00"
                max="2025-12-31T23:59"
                />
            <SelectInput
            label="Group Size"
            name="groupSize"
            id="groupSize"
            required
            options={[
              { label: "Please select", value: "" },
              { label: "1-2", value: "1-2" },
              { label: "3-5", value: "3-5" },
              { label: "6-10", value: "6-10" },
              { label: "11+", value: "11+" },
            ]}
          />

        </FormContainer>
        
        <ButtonContainer>
            <ResetButton>Reset</ResetButton>
            <SubmitButton>Submit</SubmitButton>
          </ButtonContainer>
      </FormLogic>
    </div>
  );
}
