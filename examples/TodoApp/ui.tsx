// Стилизованные компоненты
import { styled } from "@reface/plugins/styled";

export const Container = styled.div`
  & {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
`;

export const Form = styled.form`
  & {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  & input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const FilterContainer = styled.div`
  & {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  & button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }

  & button.active {
    background: #007bff;
    color: white;
    border-color: #0056b3;
  }
`;

export const List = styled.ul`
  & {
    list-style: none;
    padding: 0;
  }

  & li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  & li.completed span {
    text-decoration: line-through;
    color: #999;
  }

  & li button {
    margin-left: auto;
    border: none;
    background: none;
    color: #dc3545;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const Counter = styled.div`
  & {
    margin-top: 20px;
    color: #666;
    font-size: 14px;
  }
`;