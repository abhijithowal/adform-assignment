import { useState } from "react";
import {
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { type Dayjs } from "dayjs";
import type { Campaign } from "../../types";

const { Title, Text } = Typography;

export default function AddCampaignModal({
  open,
  onClose,
  confirmLoading,
  handleOk,
}: {
  open: boolean;
  onClose: () => void;
  confirmLoading?: boolean;
  handleOk: (campaign: Campaign) => void;
}) {
  const users = useSelector((state: RootState) => state.users.list);
  const [campaignName, setCampaignName] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState<Dayjs | null>(
    null
  );
  const [campaignEndDate, setCampaignEndDate] = useState<Dayjs | null>(null);
  const [campaignBudget, setCampaignBudget] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );
  const [formErrors, setFormErrors] = useState<{
    campaignName?: string;
    campaignStartDate?: string;
    campaignEndDate?: string;
    campaignBudget?: string;
    selectedUserId?: string;
  }>({
    campaignName: "",
    campaignStartDate: "",
    campaignEndDate: "",
    campaignBudget: "",
    selectedUserId: "",
  });

  function handleStartDateChange(date: Dayjs | null) {
    setCampaignStartDate(date);
    if (date && campaignEndDate && campaignEndDate.isBefore(date, "day")) {
      setCampaignEndDate(null);
    }
  }

  function handleEndDateChange(date: Dayjs | null) {
    setCampaignEndDate(date);
  }

  function disabledEndDate(current: Dayjs | null) {
    if (!current || !campaignStartDate) {
      return false;
    }
    return current.isBefore(campaignStartDate, "day");
  }

  function handleModalOk() {
    if (handleOk && validateForm()) {
      handleOk({
        id: Math.floor(Math.random() * 1000000),
        name: campaignName,
        startDate: campaignStartDate?.format("YYYY-MM-DD") ?? "",
        endDate: campaignEndDate?.format("YYYY-MM-DD") ?? "",
        budget: campaignBudget ?? 0,
        userId: selectedUserId ?? 0,
      });
      resetForm();
    }
  }

  function validateForm() {
    let isValid = true;
    let formErrorsToSet = { ...formErrors };
    if (!campaignName) {
      isValid = false;
      formErrorsToSet.campaignName = "Campaign name is required";
    } else {
      formErrorsToSet.campaignName = "";
    }
    if (!campaignStartDate) {
      isValid = false;
      formErrorsToSet.campaignStartDate = "Start date is required";
    } else {
      formErrorsToSet.campaignStartDate = "";
    }
    if (!campaignEndDate) {
      isValid = false;
      formErrorsToSet.campaignEndDate = "End date is required";
    } else {
      formErrorsToSet.campaignEndDate = "";
    }
    if (campaignBudget === null || campaignBudget === undefined) {
      isValid = false;
      formErrorsToSet.campaignBudget = "Budget is required";
    } else {
      formErrorsToSet.campaignBudget = "";
    }
    if (!selectedUserId) {
      isValid = false;
      formErrorsToSet.selectedUserId = "User is required";
    } else {
      formErrorsToSet.selectedUserId = "";
    }
    setFormErrors(formErrorsToSet);
    return isValid;
  }

  function handleModalCancel() {
    resetForm();
    onClose();
  }

  function resetForm() {
    setCampaignName("");
    setCampaignStartDate(null);
    setCampaignEndDate(null);
    setCampaignBudget(null);
    setSelectedUserId(undefined);
  }

  return (
    <Modal
      title={
        <Title level={4} className="mb-0 text-gray-900 dark:text-gray-100">
          Add New Campaign
        </Title>
      }
      open={open}
      onOk={handleModalOk}
      confirmLoading={confirmLoading}
      onCancel={handleModalCancel}
      okText="Create Campaign"
      cancelText="Cancel"
      width={600}
      className="[&_.ant-modal-header]:px-6 [&_.ant-modal-header]:py-4 [&_.ant-modal-body]:px-6 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4"
    >
      <div className="flex flex-col gap-6 py-2">
        <div className="flex flex-col gap-2">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Campaign Name <span className="text-red-500">*</span>
          </Text>
          <Input
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => {
              setCampaignName(e.target.value);
              setFormErrors({ ...formErrors, campaignName: "" });
            }}
            size="large"
            className="w-full"
          />
          {formErrors && formErrors.campaignName && (
            <p className="text-sm text-red-500 mt-1">
              {formErrors.campaignName}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date <span className="text-red-500">*</span>
            </Text>
            <DatePicker
              placeholder="Select start date"
              value={campaignStartDate}
              onChange={(date) => {
                handleStartDateChange(date);
                setFormErrors({ ...formErrors, campaignStartDate: "" });
              }}
              size="large"
              className="w-full"
              format="YYYY-MM-DD"
            />
            {formErrors.campaignStartDate && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.campaignStartDate}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date <span className="text-red-500">*</span>
            </Text>
            <DatePicker
              placeholder="Select end date"
              value={campaignEndDate}
              onChange={(date) => {
                handleEndDateChange(date);
                setFormErrors({ ...formErrors, campaignEndDate: "" });
              }}
              disabledDate={disabledEndDate}
              size="large"
              className="w-full"
              format="YYYY-MM-DD"
            />
            {formErrors.campaignEndDate && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.campaignEndDate}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Budget <span className="text-red-500">*</span>
            </Text>
            <InputNumber
              placeholder="Enter budget"
              value={campaignBudget}
              onChange={(value) => {
                setCampaignBudget(value);
                setFormErrors({ ...formErrors, campaignBudget: "" });
              }}
              size="large"
              className="w-full"
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, "")) || 0}
            />
            {formErrors.campaignBudget && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.campaignBudget}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              User <span className="text-red-500">*</span>
            </Text>
            <Select
              placeholder="Select user"
              value={selectedUserId}
              onChange={(value) => {
                setSelectedUserId(value);
                setFormErrors({ ...formErrors, selectedUserId: "" });
              }}
              size="large"
              className="w-full"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={users.map((user) => ({
                label: user.name,
                value: user.id,
              }))}
            />
            {formErrors.selectedUserId && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.selectedUserId}
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
