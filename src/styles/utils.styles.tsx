import styled from "@emotion/styled";

export const Space = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

export default { Space };
