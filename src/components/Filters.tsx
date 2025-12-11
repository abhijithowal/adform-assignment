import { DatePicker, Input, Button, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilters,
  setFilters,
  resetFilters,
} from "../store/campaign.slice";
import { ReloadOutlined } from "@ant-design/icons";
import dayjs, { type Dayjs } from "dayjs";
import type { RootState } from "../store/store";

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const hasActiveFilters =
    filters.startDate || filters.endDate || filters.search;
  const isLoading = useSelector(
    (state: RootState) => state.users.status === "loading"
  );

  function handleReset() {
    dispatch(resetFilters());
  }

  function handleStartDateChange(date: Dayjs | null) {
    const dateString = date ? date.format("YYYY-MM-DD") : "";
    dispatch(setFilters({ ...filters, startDate: dateString }));
    if (date && filters.endDate) {
      const endDate = dayjs(filters.endDate);
      if (endDate.isBefore(date, "day")) {
        dispatch(
          setFilters({ ...filters, startDate: dateString, endDate: "" })
        );
      }
    }
  }

  function handleEndDateChange(date: Dayjs | null) {
    const dateString = date ? date.format("YYYY-MM-DD") : "";
    dispatch(setFilters({ ...filters, endDate: dateString }));
  }

  function disabledEndDate(current: Dayjs | null) {
    if (!current || !filters.startDate) {
      return false;
    }
    const startDate = dayjs(filters.startDate);
    return current.isBefore(startDate, "day");
  }

  return (
    <div className="flex justify-between w-full ">
      {isLoading ? (
        <div className="flex gap-x-4">
          <Skeleton.Input active className="w-32" />
          <Skeleton.Input active className="w-32" />
        </div>
      ) : (
        <div className="flex gap-x-4">
          <DatePicker
            placeholder="Start Date"
            value={filters.startDate ? dayjs(filters.startDate) : null}
            onChange={handleStartDateChange}
          />
          <DatePicker
            placeholder="End Date"
            value={filters.endDate ? dayjs(filters.endDate) : null}
            onChange={handleEndDateChange}
            disabledDate={disabledEndDate}
          />
        </div>
      )}
      {isLoading ? (
        <div className="w-full flex justify-end gap-x-4">
          <Skeleton.Input active className="w-32" />
          <Skeleton.Button active className="w-32" />
        </div>
      ) : (
        <div className="flex gap-x-4">
          <Input
            placeholder="Search..."
            className="w-fit"
            value={filters.search}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, search: e.target.value }))
            }
          />
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            disabled={!hasActiveFilters}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
