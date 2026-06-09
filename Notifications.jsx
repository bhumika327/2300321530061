import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  const [page, setPage] = useState(1);
  const [type, setType] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, type]);

  const fetchData = async () => {
    try {
      const data = await getNotifications(
        page,
        10,
        type
      );

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const markViewed = (id) => {
    let viewed =
      JSON.parse(
        localStorage.getItem("viewed")
      ) || [];

    if (!viewed.includes(id)) {
      viewed.push(id);
      localStorage.setItem(
        "viewed",
        JSON.stringify(viewed)
      );
    }

    fetchData();
  };

  const viewed =
    JSON.parse(
      localStorage.getItem("viewed")
    ) || [];

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
      >
        All Notifications
      </Typography>

      <Select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>
      </Select>

      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          viewed={viewed.includes(n.id)}
          onClick={() =>
            markViewed(n.id)
          }
        />
      ))}

      <Button
        onClick={() =>
          setPage(page - 1)
        }
        disabled={page === 1}
      >
        Prev
      </Button>

      <Button
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </Button>
    </Container>
  );
};

export default Notifications;
