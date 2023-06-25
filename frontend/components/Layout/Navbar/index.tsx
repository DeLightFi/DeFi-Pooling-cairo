import { connect, disconnect } from '@argent/get-starknet'

import { FaWindowMaximize } from "react-icons/fa";
import { Container } from "./NavbarElements";



const Navbar = ({ connection, setConnection }) => {
    const connectToStarknet = async () => {
        const connection = await connect({
            modalWalletAppearance: "all"
        });
        if (connection && connection.isConnected) {
            setConnection(connection);
        }
    };

    const disconnectWallet = async () => {
        await disconnect();
        setConnection(undefined);
    }

    return (
        <Container>
            <span>mirror</span>
            {connection === null || connection === undefined ?
                <div onClick={async () => await connectToStarknet()}>
                    <FaWindowMaximize />
                    Connect
                </div>
                :
                <div onClick={async () => await disconnectWallet()}>
                    <FaWindowMaximize />
                    Disconnect
                </div>
            }
        </Container>
    );
};

export default Navbar;
