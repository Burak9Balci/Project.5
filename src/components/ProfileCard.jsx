import React from "react";
import { Card } from "react-bootstrap";

const ProfileCard = ({ user }) => {
  return (
    <Card className="profile-card">
      <Card.Body>
        <Card.Title className="profile-card__title">{user.name}</Card.Title>
        <Card.Text className="profile-card__text">
          Email: {user.email}
        </Card.Text>
        <Card.Text className="profile-card__text">
          Phone: {user.phone}
        </Card.Text>
        <Card.Text className="profile-card__text">
          Address: {user.address?.city}, {user.address?.street}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
