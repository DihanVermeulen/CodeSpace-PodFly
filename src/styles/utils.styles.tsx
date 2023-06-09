import styled from "@emotion/styled";

const Space = styled.div<{ height: number }>`
  height: ${(props) => props.height};
`;

export default { Space };
