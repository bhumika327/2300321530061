import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

const NotificationCard = ({
  notification,
  viewed,
  onClick,
}) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: viewed
          ? "4px solid gray"
          : "4px solid green",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.title}
        </Typography>

        <Typography>
          {notification.message}
        </Typography>

        <Chip
          label={notification.notification_type}
          sx={{ mt: 1 }}
        />

        {!viewed && (
          <Chip
            color="success"
            label="NEW"
            sx={{ ml: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
