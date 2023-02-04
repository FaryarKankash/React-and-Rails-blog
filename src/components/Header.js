import { Card, Button, Text } from "@sonnat/ui";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const logInHandler = () => {
    history.push("/sign");
  };

  const postHandler = () => {
    history.push("/post");
  };

  return (
    <div className="d-flex flex-column justify-content-between align-items-center pt-3 px-3">
      <Card
        className={
          "w-100 p-4 m-2 d-flex flex-row justify-content-between align-items-center"
        }
      >
        <Text color="secondary" weight="bold" variant="h4">
          React blog
        </Text>
      </Card>
    </div>
  );
};

export default Header;
