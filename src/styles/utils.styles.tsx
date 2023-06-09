import styled from "@emotion/styled";

const Space = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

export default { Space };
