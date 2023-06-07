import styled from "@emotion/styled";

const Header = styled.header`
  display: flex;
  padding-left: .6rem;
  padding-right:.6rem;

  & > :last-child {
    margin-left: auto;
  }
`;

export default { Header };
