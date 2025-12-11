import React, { useState } from "react";
import { Layout, Switch, Typography, Flex, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../store/theme.slice";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import AddCampaignModal from "./modals/AddCampaign.modal";
import type { Campaign } from "../types";
import { addCampaign } from "../store/campaign.slice";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const [open, setOpen] = useState(false);

  const handleThemeChange = (checked: boolean) => {
    dispatch(setTheme(checked ? "dark" : "light"));
  };

  const isDark = currentTheme === "dark";

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: isDark ? "#001529" : "#ffffff",
        borderBottom: isDark ? "none" : "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="flex items-center gap-x-2">
        <Title
          level={4}
          style={{ margin: 0, color: isDark ? "white" : "inherit" }}
        >
          AdForm Campaigns
        </Title>
      </div>
      <div className="flex items-center gap-x-2">
        <Button type="text" className="" onClick={() => setOpen(true)}>
          Add Campaign
        </Button>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={isDark}
          onChange={handleThemeChange}
        />
      </div>
      <AddCampaignModal
        open={open}
        onClose={() => setOpen(false)}
        handleOk={(campaign: Campaign) => {
          dispatch(addCampaign(campaign));
          setOpen(false);
          message.success("Campaign added successfully");
        }}
      />
    </Header>
  );
};

export default Navbar;
