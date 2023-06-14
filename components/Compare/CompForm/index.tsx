import { FaSearch } from "react-icons/fa";

import { FormWrapper, Form } from "./CompFormElements";
import { useState } from "react";

const SearchForm = ({ setAddress1, setAddress2 }) => {
  const [inputvalue1, setInputValue1] = useState('');
  const [inputvalue2, setInputValue2] = useState('');

  const AddOne = (e) => {
    e.preventDefault();
    if (inputvalue1 === '' || inputvalue2 === '') return;
    setAddress1(inputvalue1);
    setAddress2(inputvalue2);
  }

  return (
    <FormWrapper>
      <Form>
        <input type="text" required placeholder="Starknet Address 1 (0x0000...0000)" name="address1" onChange={(event) => setInputValue1(event.target.value)} />
        <input type="text" required placeholder="Starknet Address 2 (0x0000...0000)" name="address2" onChange={(event) => setInputValue2(event.target.value)} />
      </Form>
      <FaSearch onClick={(e) => AddOne(e)} />
    </FormWrapper>
  );
};

export default SearchForm;
