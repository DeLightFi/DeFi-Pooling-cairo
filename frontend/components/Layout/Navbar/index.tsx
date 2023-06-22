import { FaWindowMaximize } from "react-icons/fa";
import { Container } from "./NavbarElements";


const Navbar = ({ }) => {
    return (
        <Container>
            <span>mirror</span>
            <div>
                <FaWindowMaximize />
                Connect
            </div>
        </Container>
    );
};

export default Navbar;
