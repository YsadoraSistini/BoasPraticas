import styled from "styled-components";
import ReactInputMask from "react-input-mask";

export const Container = styled.div`
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  background-color: var(--light-gray);
`;

export const Right = styled.div`
  width: 55%;
  padding: 20px;
  h2 {
    font-size: 1.17em;
  }
`;

export const Form = styled.form`
  background-color: #fff;
  margin-top: 10px;
  padding: 25px;
  border-radius: 25px;
  border: 1px solid var(--orangelight);
  box-shadow: 0px 0px 10px var(--orangelight);
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaçamento vertical entre as seções */
`;

export const Section = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;

  h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: var(--dark-gray);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    /* O label ocupará uma largura de 30% e o input 65% */
    label {
      width: 30%;
      text-align: right;
      padding-right: 10px;
    }

    input {
      width: 65%;
      padding: 10px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }
  }

  div{
  gap: 2px;
  display: flex;
  align-items: start;
  justify-content: start;
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ffff;
`;

export const Label = styled.label`
  font-size: 1em;
  font-weight: 500;
`;

export const Button = styled.button`
  background-color: var(--orange);
  color: #fff;
  padding: 12px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  text-align: center;

  &:hover {
    background-color: var(--dark-orange);
  }
`;

export const Mask = styled(ReactInputMask)`
    height: 50px;
    padding: 8px 15px;
    border-radius: 5px;
    width: 100%;
    color: var(--secondary);
    letter-spacing: 1px;
    font-size: 15px;
    margin-bottom: 10px;
    outline: none;
    border-color: var(--gray);
    border: 1px solid var(--gray);
    resize: none;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px;
  padding-right: 10px;
  gap: 20px;
`
export const Div = styled.div`
    width: 60%;
    padding: 10px;
`
export const ContainerCard = styled.div`
  width: calc(50% - 20px);
  margin-bottom: 20px;
  background-color: var(--white);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;


export const Img = styled.div`
    width: 100%;
    height: 150px;
    img{
    border-radius: 4px 4px 0 0;
        width: 100%;
        height: 100%;
    }
`

export const Description = styled.div`
    padding: 2px;
    a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--secondary);
    }
    h4{
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
`

export const Itens = styled.div` 
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    span{
        margin-bottom: 10px;
    }
`