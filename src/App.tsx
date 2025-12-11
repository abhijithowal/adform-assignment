import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/user.slice";
import type { RootState } from "./store/store";
import Filters from "./components/Filters";
import CampaignTable from "./components/Table";
import Navbar from "./components/Navbar";
import { ConfigProvider, Layout, theme } from "antd";
import { selectTheme } from "./store/theme.slice";
import Loader from "./components/Loader";

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  const users = useSelector((state: RootState) => state.users.list);
  const filteredCampaigns = useSelector(
    (state: RootState) => state.campaigns.filteredList
  );
  const loading = useSelector((state: RootState) => state.users.status === "loading");

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content style={{ padding: "24px" }}>
          <div className="flex flex-col gap-y-8">
            <Filters />

            {loading ? <Loader  /> : <CampaignTable data={filteredCampaigns} users={users} />}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
