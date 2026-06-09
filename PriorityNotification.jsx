import {
  useEffect,
  useState,
} from "react";

import {
  Container,
  Typography,
  TextField,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/api";

const PriorityNotifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  const [topN, setTopN] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data =
      await getNotifications();

    const priority =
      data.filter(
        (n) =>
          n.priority === true ||
          n.priority === "high"
      );

    setNotifications(priority);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
      >
        Priority Notifications
      </Typography>

      <TextField
        type="number"
        label="Top N"
        value={topN}
        onChange={(e) =>
          setTopN(e.target.value)
        }
      />

      {notifications
        .slice(0, topN)
        .map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            viewed={false}
          />
        ))}
    </Container>
  );
};

export default PriorityNotifications;
