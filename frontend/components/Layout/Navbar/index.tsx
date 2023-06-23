import { connect, disconnect } from '@argent/get-starknet'

import { FaWindowMaximize } from "react-icons/fa";
import { Container } from "./NavbarElements";



const Navbar = ({ connection, setConnection, setProvider, setAddress }) => {
    const connectToStarknet = async () => {
        const connection = await connect({
            modalWalletAppearance: "all"
        });
        if (connection && connection.isConnected) {
            setConnection(connection);
            setProvider(connection.account);
            setAddress(connection.selectedAddress);
        }
    };

    const disconnectWallet = async () => {
        await disconnect();
        setConnection(undefined);
        setProvider(undefined);
        setAddress('');
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
