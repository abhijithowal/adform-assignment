import type { ColumnType } from "antd/es/table";
import { Typography, Tag } from "antd";
import type { Campaign, User } from "../types";
import { formatNumberToCurrency } from "../utils/app.utils";

const { Text } = Typography;

export const CAMPAIGN_COLUMNS: (users: User[]) => ColumnType<Campaign>[] = (
  users
) => [
  {
    title: (
      <Text strong className="text-base font-semibold">
        Name
      </Text>
    ),
    dataIndex: "name",
    key: "name",
    width: 200,
    fixed: "left" as const,
    render: (text: string) => (
      <Text
        strong
        className="text-base font-medium text-gray-900 dark:text-gray-100"
      >
        {text}
      </Text>
    ),
  },
  {
    title: (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        User Name
      </Text>
    ),
    dataIndex: "userId",
    key: "userId",
    width: 150,
    render: (_, record) => {
      const userName = users.find((user) => user.id === record.userId)?.name;
      return (
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {userName || "Unknown User"}
        </Text>
      );
    },
  },
  {
    title: (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Start Date
      </Text>
    ),
    dataIndex: "startDate",
    key: "startDate",
    width: 140,
    align: "center" as const,
    render: (_, record) => {
      const date = new Date(record.startDate);
      return (
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      );
    },
  },
  {
    title: (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        End Date
      </Text>
    ),
    dataIndex: "endDate",
    key: "endDate",
    width: 140,
    align: "center" as const,
    render: (_, record) => {
      const date = new Date(record.endDate);
      return (
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      );
    },
  },
  {
    title: (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Status
      </Text>
    ),
    dataIndex: "active",
    key: "active",
    width: 120,
    align: "center" as const,
    render: (_, record) => {
      const isActive =
        new Date(record.startDate) < new Date() &&
        new Date(record.endDate) > new Date();
      return (
        <Tag color={isActive ? "green" : "red"} className="font-medium">
          {isActive ? "Active" : "Inactive"}
        </Tag>
      );
    },
  },
  {
    title: (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Budget
      </Text>
    ),
    dataIndex: "budget",
    key: "budget",
    width: 150,
    align: "right" as const,
    render: (_, record) => {
      return (
        <Text
          strong
          className="text-sm font-semibold text-gray-900 dark:text-gray-100"
        >
          {formatNumberToCurrency(record.budget)}
        </Text>
      );
    },
  },
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: "Divavu",
    startDate: "9/19/2025",
    endDate: "3/9/2026",
    budget: 88377,
    userId: 3,
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "11/21/2024",
    endDate: "2/21/2025",
    budget: 608715,
    userId: 6,
  },
  {
    id: 3,
    name: "Miboo",
    startDate: "11/1/2024",
    endDate: "6/20/2025",
    budget: 239507,
    userId: 7,
  },
  {
    id: 4,
    name: "Trilith",
    startDate: "8/25/2024",
    endDate: "11/30/2025",
    budget: 179838,
    userId: 1,
  },
  {
    id: 5,
    name: "Layo",
    startDate: "11/28/2024",
    endDate: "3/10/2025",
    budget: 837850,
    userId: 9,
  },
  {
    id: 6,
    name: "Photojam",
    startDate: "7/25/2024",
    endDate: "6/23/2026",
    budget: 858131,
    userId: 3,
  },
  {
    id: 7,
    name: "Blogtag",
    startDate: "6/27/2023",
    endDate: "1/15/2025",
    budget: 109078,
    userId: 2,
  },
  {
    id: 8,
    name: "Rhyzio",
    startDate: "10/13/2023",
    endDate: "1/25/2025",
    budget: 272552,
    userId: 4,
  },
  {
    id: 9,
    name: "Zoomcast",
    startDate: "9/6/2023",
    endDate: "11/10 /2025",
    budget: 301919,
    userId: 8,
  },
  {
    id: 10,
    name: "Realbridge",
    startDate: "3/5/2025",
    endDate: "10/2/2026",
    budget: 505602,
    userId: 5,
  },
];
