import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../../components/animations/PageTransition";
import Modal from "../../components/modals/Modal";
import ResourceForm from "../../components/forms/ResourceForm";
import DataTable from "../../components/tables/DataTable";
import PageLoader from "../../components/common/PageLoader";
import { resources } from "../../constants/resources";
import {
  createResource,
  deleteResource,
  deleteResources,
  listResource,
  updateResource,
} from "../../services/mockApi";

export default function ResourcePage() {
  const { slug } = useParams();
  const resource = useMemo(
    () => resources.find((item) => item.slug === slug) || resources[0],
    [slug],
  );
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    setRows(await listResource(resource.slug));
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [resource.slug]);

  const save = async (values) => {
    if (editing?.id) {
      await updateResource(resource.slug, editing.id, values);
      toast.success(`${resource.name} updated`);
    } else {
      await createResource(resource.slug, values);
      toast.success(`${resource.name} created`);
    }
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (row) => {
    await deleteResources(resource.slug, [row]);
    toast.success(`${resource.name} deleted`);
    load();
  };

  const removeSelected = async (selectedRows) => {
    await deleteResources(resource.slug, selectedRows);
    toast.success(
      `${selectedRows.length} ${resource.name} record${selectedRows.length > 1 ? "s" : ""} deleted`,
    );
    load();
  };

  if (loading) return <PageLoader />;
  return (
    <PageTransition>
      <div className="mb-6">
        <p className="font-semibold text-brand">Alumni Admin</p>
        <h1 className="text-3xl font-bold">{resource.name}</h1>
        <p className="text-sm text-slate-500">
          Manage {resource.name.toLowerCase()} records with search, filters,
          CRUD, export, and pagination.
        </p>
      </div>

      <DataTable
        data={rows}
        fields={resource.fields}
        resourceName={resource.name}
        onEdit={(row) => {
          setEditing(row);
          setOpen(true);
        }}
        onDelete={remove}
        onBulkDelete={removeSelected}
        onCreate={() => {
          setEditing(null);
          setOpen(true);
        }}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit ${resource.name}` : `Create ${resource.name}`}
      >
        <ResourceForm
          resource={resource}
          initialValues={editing || {}}
          onSubmit={save}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </PageTransition>
  );
}
