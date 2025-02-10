import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons"; // Bootstrap ikonu
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Container className="d-flex justify-content-center mt-4">
      <Row>
        <Col>
          <Card className="profile-card position-relative">
            <Button
              variant="primary"
              className="profile-card__edit-btn"
              onClick={() => navigate(`/update/${user?.id}`)}
            >
              <PencilSquare size={20} />
            </Button>

            <Card.Body>
              <Card.Title className="profile-card__title">
                {user?.name || "User Name"}
              </Card.Title>
              <Card.Text className="profile-card__text">
                <strong>Email:</strong> {user?.email || "example@email.com"}
              </Card.Text>
              <Card.Text className="profile-card__text">
                <strong>Phone:</strong> {user?.phone || "+123456789"}
              </Card.Text>
              <Card.Text className="profile-card__text">
                <strong>Address:</strong>
                {user?.address
                  ? `${user.address.city}, ${user.address.street}`
                  : "Not Available"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileCard;
