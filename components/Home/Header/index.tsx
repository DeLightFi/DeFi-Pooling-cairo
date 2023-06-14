import { useState } from "react";
import { useRouter } from 'next/router';
import { FaSearch } from "react-icons/fa";

import { Container, Title, Search, Form } from "./HeaderElements";
import Wallet from "../Wallet";

const Header = ({ data, setData }) => {
    const router = useRouter()
    const [inputvalue, setInputValue] = useState('');

    const SearchForIt = (e) => {
        e.preventDefault();
        if (inputvalue === '') return;
        router.push(`/dashboard/${inputvalue}`);
    }

    return (
        <Container>
            <Title>Dashboard</Title>
            <Search>
                <Form>
                    <input type="text" required placeholder="Starknet Address (0x or starknetId)" name="address" onChange={(event) => setInputValue(event.target.value)} />
                </Form>
                <FaSearch onClick={(e) => SearchForIt(e)} />
            </Search>
        </Container>
    );
};

export default Header;
