import {
  Card,
  Button,
  Text,
  IconButton,
  CardHeader,
  CardMedia,
  CardBody,
  CardActionBar,
  Image,
  CardActionableArea,
} from "@sonnat/ui";
import { DotsVertical, Heart } from "@sonnat/icons";
import { useHistory } from "react-router-dom";

const BlogCard = (props) => {
  const history = useHistory();

  const moreHandler = (id) => {
    history.push(`/Post/${id}`);
  };

  return (
    <div className="p-4 col-12 col-sm-6 col-md-4 col-lg-3">
      <Card>
        <CardMedia>
          <Image
            src={props.img}
            alt="Random Image"
            layout="responsive"
            width="300"
            height="200"
          />
        </CardMedia>
        <CardHeader
          action={
            <IconButton
              variant="inlined"
              icon={<DotsVertical />}
              aria-label="Demo Button"
            />
          }
        >
          <Text variant="subtitle">{props.name}</Text>
        </CardHeader>
        <CardBody>
          <Text variant="body" as="p" color="textSecondary">
            {props.description.slice(0, 120)}
          </Text>
        </CardBody>
        <CardActionBar>
          <Button
            label="more"
            variant="inlined"
            onClick={() => {
              moreHandler(props.id);
            }}
          />
          <IconButton
            style={{ marginLeft: "auto" }}
            icon={<Heart />}
            variant="inlined"
            aria-label="Demo Button"
          />
        </CardActionBar>
      </Card>
    </div>
  );
};

export default BlogCard;
