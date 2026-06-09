import axios from "axios";

const BASE_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export const getNotifications = async (
  page = 1,
  limit = 10,
  type = ""
) => {
  const response = await axios.get(BASE_URL, {
    params: {
      page,
      limit,
      notification_type: type || undefined,
    },
  });

  return response.data;
};
