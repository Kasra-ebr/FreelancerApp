import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import RHFSelect from "../../../ui/RHFSelect";
import Loading from "../../../ui/Loading";
import useChangeUserStatus from "./useChangeUserStatus";

const options = [
  {
    label: "Rejected",
    value: 0,
  },
  {
    label: "Pending Approval",
    value: 1,
  },
  {
    label: "Approved",
    value: 2,
  },
];

function ChangeUserStatus({ userId, onClose }) {
  const { register, handleSubmit } = useForm();
  const { changeUserStatus, isUpdating } = useChangeUserStatus();
  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    changeUserStatus(
      { userId, data }, // {userId, data: {status:0, 1, 2}}
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect
          name="status"
          label="Change Status"
          register={register}
          required
          options={options}
        />
        <div className="!mt-8">
          {isUpdating ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full" type="submit">
              Confirm
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default ChangeUserStatus;
