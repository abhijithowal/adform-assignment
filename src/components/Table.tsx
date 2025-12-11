import { Table } from "antd";
import type { Campaign, User } from "../types";
import { CAMPAIGN_COLUMNS } from "../constants/app.constants";
import type { TablePaginationConfig } from "antd";

interface TableProps {
  data: Campaign[];
  users: User[];
}

export default function CampaignTable({ data, users }: TableProps) {
  const paginationConfig: TablePaginationConfig = {
    pageSize: 5,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} of ${total} campaigns`,
    pageSizeOptions: ["10", "20", "50", "100"],
  };

  return (
    <Table<Campaign>
      columns={CAMPAIGN_COLUMNS(users)}
      dataSource={data}
      pagination={paginationConfig}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
}
