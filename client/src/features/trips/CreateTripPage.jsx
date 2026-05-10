import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PlaneTakeoff, Plus, Trash2, Calendar, MapPin, DollarSign, ArrowRight, Save } from 'lucide-react';
import { useTripStore } from '@/store/tripStore';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const addTrip = useTripStore((state) => state.addTrip);
  
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      place: '',
      startDate: '',
      endDate: '',
      sections: [{ title: '', budget: '', startDate: '', endDate: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections'
  });

  const onSubmit = (data) => {
    console.log('New Trip:', data);
    addTrip(data);
    navigate('/trips');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plan a New Adventure</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to start your journey</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium border rounded-xl hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Trip
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Card */}
        <div className="bg-card border rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-primary font-semibold border-b pb-4">
            <MapPin className="h-5 w-5" />
            Basic Trip Information
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trip Title</label>
              <input 
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., European Summer Tour"
                className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination(s)</label>
              <input 
                {...register('place', { required: 'Destination is required' })}
                placeholder="e.g., Paris, Rome, Zurich"
                className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="date"
                  {...register('startDate', { required: true })}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="date"
                  {...register('endDate', { required: true })}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Trip Sections / Stops</h3>
            <button 
              type="button"
              onClick={() => append({ title: '', budget: '', startDate: '', endDate: '' })}
              className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Another Section
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-card border rounded-2xl p-6 relative group animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="absolute top-4 right-4 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-30 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Section Title</label>
                    <input 
                      {...register(`sections.${index}.title`, { required: true })}
                      placeholder="e.g., Paris Exploration"
                      className="w-full h-10 px-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-3 h-3.5 w-3.5 text-muted-foreground" />
                      <input 
                        type="number"
                        {...register(`sections.${index}.budget`, { required: true })}
                        placeholder="0.00"
                        className="w-full h-10 pl-8 pr-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dates</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="date"
                        {...register(`sections.${index}.startDate`)}
                        className="w-full h-10 px-2 rounded-lg border bg-background text-xs outline-none"
                      />
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <input 
                        type="date"
                        {...register(`sections.${index}.endDate`)}
                        className="w-full h-10 px-2 rounded-lg border bg-background text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t flex justify-end">
           <button 
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-12 gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Trip
            <PlaneTakeoff className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
