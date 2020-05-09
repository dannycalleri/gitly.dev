import styled from "styled-components";
export const Log = styled.div`
  font-family: "Source Code Pro", monospace;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  padding: 20px;
  overflow-wrap: ${(props) => (props.isLoading ? "break-word" : "normal")};
  margin-bottom: 25px;
  margin-top: 25px;
`;
