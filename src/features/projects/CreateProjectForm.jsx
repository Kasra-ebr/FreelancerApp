import { TagsInput } from "react-tag-input-component";
import RHFSelect from "../../ui/RHFSelect";
import TextField from "../../ui/TextField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePickerField from "../../ui/DatePickerField";
import useCategories from "../../hooks/useCategories";
import useCreateProject from "./useCreateProject";
import Loading from "../../ui/Loading";
import useEditProject from "./useEditProject";

function CreateProjectForm({ onClose, projectToEdit = {} }) {
  const { _id: editId } = projectToEdit;
  const isEditSession = Boolean(editId);

  const {
    title,
    description,
    budget,
    category,
    deadline,
    tags: prevTags,
  } = projectToEdit;

  const editValues = isEditSession
    ? {
        title,
        description,
        budget,
        category: category?._id,
      }
    : {};

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: editValues,
  });

  const [tags, setTags] = useState(prevTags || []);
  const [date, setDate] = useState(deadline ? new Date(deadline) : new Date());

  const { categories } = useCategories();
  const { isCreating, createProject } = useCreateProject();
  const { editProject, isEditing } = useEditProject();

  const onSubmit = (data) => {
    const newProject = {
      ...data,
      deadline: new Date(date).toISOString(),
      tags,
    };

    const onSuccess = () => {
      onClose();
      reset();
    };

    if (isEditSession) {
      editProject({ id: editId, newProject }, { onSuccess });
    } else {
      createProject(newProject, { onSuccess });
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        name="title"
        register={register}
        required
        validationSchema={{
          required: "Title is required",
          minLength: {
            value: 10,
            message: "Enter at least 10 characters",
          },
        }}
        errors={errors}
      />
      <TextField
        label="Description"
        name="description"
        register={register}
        required
        validationSchema={{
          required: "Description is required",
          minLength: {
            value: 15,
            message: "Enter at least 15 characters",
          },
        }}
        errors={errors}
      />
      <TextField
        label="Budget"
        name="budget"
        type="number"
        register={register}
        required
        validationSchema={{
          required: "Budget is required",
        }}
        errors={errors}
      />
      <RHFSelect
        label="Category"
        required
        name="category"
        register={register}
        options={categories}
      />
      <div>
        <label className="mb-2 block text-secondary-700">Tags</label>
        <TagsInput value={tags} onChange={setTags} name="tags" />
      </div>
      <DatePickerField date={date} setDate={setDate} label="Deadline" />
      <div className="!mt-8">
        {isCreating || isEditing ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            Confirm
          </button>
        )}
      </div>
    </form>
  );
}

export default CreateProjectForm;
