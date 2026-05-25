import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { titleCase } from '../../utils/format';

const optionalString = z.union([z.string(), z.boolean(), z.number()]).optional();

export default function ResourceForm({ resource, initialValues = {}, onSubmit, onCancel }) {
  const schema = z.object(Object.fromEntries(resource.fields.map((field) => [field, optionalString])));
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: initialValues });
  return <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
    {resource.fields.map((field) => <label key={field} className="space-y-1"><span className="text-xs font-semibold text-slate-500">{titleCase(field)}</span><input className="input" {...register(field)} placeholder={titleCase(field)} />{errors[field] && <p className="text-xs text-red-500">Invalid value</p>}</label>)}
    <div className="flex justify-end gap-3 md:col-span-2"><button type="button" onClick={onCancel} className="btn-secondary">Cancel</button><button disabled={isSubmitting} className="btn-primary">Save Record</button></div>
  </form>;
}
