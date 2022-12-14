import React from "react";
import { Container, Col4, TitleFooter, Row } from "./styles";
import { FooterProps } from "./types";
import ListGroupComponent from "../../../../../src/views/Marketplace/components/ListGroup";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = () => {
  const style = {
    background: "#1C0869",
    padding: "60px 0",
  };
  const data = [
    {
      name: "Mail: contact@soccercrypto.io",
      href: "#",
    },
    {
      name: "Address: 28 Collyer Quay, Singapore",
      href: "#",
    },
    {
      name: "Support & Partnership:",
      href: "#",
    },
    {
      name: "contact@soccercrypto.io",
      href: "#",
    },
  ];
  const data2 = [
    {
      name: "White Paper",
      href: "#",
    },
    {
      name: "Project Overview",
      href: "#",
    },
    {
      name: "Token Metrics",
      href: "#",
    },
    {
      name: "Game Instructions",
      href: "#",
    },
  ];
  return (
    <div className="Footer" style={style}>
      <Container>
        <Row>
          <Col4>
            <TitleFooter>Soccer Crypto</TitleFooter>
            <ListGroupComponent data={data} />
          </Col4>
          <Col4>
            <TitleFooter>ABOUT</TitleFooter>
            <ListGroupComponent data={data2} />
          </Col4>
          <Col4>
            <TitleFooter>SOCIAL</TitleFooter>
            <ListGroupComponent data={data2} />
          </Col4>
          <Col4>
            <TitleFooter>OTHERS</TitleFooter>
            <ListGroupComponent data={data2} />
          </Col4>
        </Row>
      </Container>
    </div>
  );
};

export default MenuItem;
