import Link from "next/link";
import { FaRegTimesCircle } from "react-icons/fa";

import { Title, GridContainer, IntegrationCardParent, IntegrationCardBack, IntegrationCardFront } from "./IntegrationsElements";

import integrations from "./integrations.json";

const Integrations = () => {

  return (
    <>
      <GridContainer>
        {
          integrations.map((integration, index) => {
            return (
              <IntegrationCardParent>
                <IntegrationCardBack>
                  <span>{integration.name}</span>
                  <span>{integration.dscp}</span>
                </IntegrationCardBack>
                <IntegrationCardFront>
                  <img src={integration.image} />
                </IntegrationCardFront>
              </IntegrationCardParent>
            )
          })
        }
        <IntegrationCardParent>
          <a href="https://twitter.com/StarkenDefi" target="_blank">
            <button>Your defi protocol or nft collection isn't listed?<br /> Reach us!</button>
          </a>
        </IntegrationCardParent>
      </GridContainer>
    </>
  );
};

export default Integrations;
