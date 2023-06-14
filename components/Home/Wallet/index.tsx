import Link from "next/link";
import { FaRegTimesCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { GridContainer, WalletCard, ModalContainer, LinkedButton, Circle, ButtonAndFilterContainer, FilterButton, FilterCard, FilterContainer, FilterHeader, ScrollableContainer, BorderWrapper, BorderWrapperInit, Container, FirstCoSubTitle, FirstCoTitle, FlexIcon, FlexNameAdd, NameWalletCard, AddressWalletCard, LinkedButtonLight } from "./WalletElements";
import { useEffect, useRef, useState } from "react";
import Checkbox from "../../CheckBox";

const Wallet = () => {
  type StringToBooleanMapping = { [key: string]: boolean };

  const [inModal, setInModal] = useState(false);
  const [newWname, setNewWname] = useState("");
  const colors = ["cyan", "pink", "#feca57", "#1dd1a1", "magenta", "lightblue"];
  const [isWalletFilterVisible, setWalletFilterVisible] = useState(false);
  const [walletFilter, setWalletFilter] = useState<StringToBooleanMapping>({});
  const [data, setData] = useState({ data: [] });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingName, setEditingName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // read storage on first render
  useEffect(() => {
    const stored = localStorage.getItem("wallets");
    if (stored !== "undefined" && stored !== null) {
      setData({ data: JSON.parse(stored) });
    }
  }, []);

  const walletFilterRef = useRef<HTMLDivElement>(null);

  const DeleteOne = (d) => {
    // delete etc or add to local storage
    let copied = [...data.data];
    copied = copied.filter((item) => item.address !== d.address);

    setData({ data: copied });
    localStorage.setItem("wallets", JSON.stringify(copied));
  };

  const UpdateOne = (add) => {
    let copied = [...data.data];

    for (let index = 0; index < copied.length; index++) {
      if (copied[index].address == add) {
        copied[index].name = editingName;
      }
    }
    setData({ data: copied });
    localStorage.setItem("wallets", JSON.stringify(copied));
    setIsEditing(false);
  };

  const handleTokensFilterClick = () => {
    setWalletFilterVisible(!isWalletFilterVisible);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    // Get button DOM nodes
    const walletFilterButtonNode = document.querySelector("#walletFilterButton");

    // Check if the click happened outside the filters and wasn't on one of the buttons
    if (
      walletFilterRef.current &&
      !walletFilterRef.current.contains(e.target as Node) &&
      e.target !== walletFilterButtonNode
    ) {
      setWalletFilterVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);



  const handleFilterClick = (index: number) => {
    let copied = [...data.data];
    copied[index].active = !copied[index].active;
    setData({ data: copied });
  };

  const handleEditClick = (index: number) => {
    const walletName = data.data[index].name;
    setEditingName(walletName);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditingName(event.target.value);
  };

  const handleSaveClick = () => {
    UpdateOne(data.data[editingIndex].address);
  };

  return (
    <Container>
      {data.data.length === 0 ? (
        <>
          <FirstCoTitle>Welcome to Starken</FirstCoTitle>
          <FirstCoSubTitle>
            Connect a Starknet wallet to manage your DeFi portfolio
          </FirstCoSubTitle>
          <Link href="/connectWallet">
            <BorderWrapperInit>
              <LinkedButton>
                {data.data.length === 0
                  ? "Connect Wallet"
                  : `${data.data.length} Active Wallet`}
              </LinkedButton>
            </BorderWrapperInit>
          </Link>
        </>
      ) : (
        <>
          <ButtonAndFilterContainer>
            <BorderWrapperInit>
              <FilterButton
                id="walletFilterButton"
                onClick={handleTokensFilterClick}
              >
                {data.data.length === 0
                  ? "Connect Wallet"
                  : `${data.data.length} Active Wallet`}
              </FilterButton>
            </BorderWrapperInit>
            {isWalletFilterVisible && (
              <FilterContainer ref={walletFilterRef}>
                <ScrollableContainer>
                  {data.data.map(function (d, key) {
                    return (
                      <WalletCard key={key}>
                        {isEditing && key === editingIndex ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Link href={`/dashboard/${d.address}`}>
                            <FlexNameAdd>
                              <NameWalletCard>
                                {d.name ? d.name : `wallet ${key}`}
                              </NameWalletCard>
                              <AddressWalletCard>
                                {
                                  d.address.includes(".stark") ?
                                    <>
                                      {d.address}</>
                                    :
                                    <>
                                      {d.address.slice(0, 6)}...
                                      {d.address.slice(d.address.length - 4, d.address.length)}
                                    </>
                                }
                              </AddressWalletCard>
                            </FlexNameAdd>
                          </Link>
                        )}
                        <FlexIcon>
                          {isEditing && key === editingIndex ? (
                            <GrValidate onClick={handleSaveClick} />
                          ) : (
                            <BsPencilSquare onClick={() => handleEditClick(key)} />
                          )}
                          <FaRegTimesCircle onClick={() => DeleteOne(d)} />
                        </FlexIcon>
                      </WalletCard>
                    );
                  })}
                </ScrollableContainer>
                <LinkedButtonLight href="/connectWallet">
                  Add New Wallets
                </LinkedButtonLight>
              </FilterContainer>
            )}
          </ButtonAndFilterContainer>
        </>
      )}
    </Container>
  );
};

export default Wallet;
