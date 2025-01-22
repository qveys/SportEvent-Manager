import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Globe, Users, Ruler, Waves } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { PlacesAutocomplete } from '../common/PlacesAutocomplete';
import { usePlacesAutocomplete } from '../../hooks/usePlacesAutocomplete';
import { useForm } from '../../hooks/useForm';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { Card } from '../common/Card';

interface VenueFormData {
  name: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  capacity: string;
  lanes: string;
  length: string;
  width: string;
  depth_min: string;
  depth_max: string;
  has_diving_boards: boolean;
  has_timing_system: boolean;
  is_indoor: boolean;
  is_accessible: boolean;
  notes: string;
}

interface VenueFormProps {
  initialData?: VenueFormData;
  venueId?: string;
  onSuccess?: () => void;
}

export const VenueForm: React.FC<VenueFormProps> = ({ 
  initialData,
  venueId,
  onSuccess 
}) => {
  const navigate = useNavigate();
  const { 
    address, 
    setAddress, 
    addressComponents, 
    handlePlaceSelect 
  } = usePlacesAutocomplete();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useForm<VenueFormData>({
    initialValues: initialData || {
      name: '',
      type: 'pool',
      phone: '',
      email: '',
      website: '',
      capacity: '',
      lanes: '',
      length: '',
      width: '',
      depth_min: '',
      depth_max: '',
      has_diving_boards: false,
      has_timing_system: false,
      is_indoor: true,
      is_accessible: true,
      notes: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof VenueFormData, string>> = {};
      
      if (!values.name) {
        errors.name = 'Name is required';
      }
      
      if (!address) {
        errors.address = 'Address is required';
      }

      if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (values.website && !/^https?:\/\/.+\..+/.test(values.website)) {
        errors.website = 'Invalid website URL';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const venueData = {
          ...values,
          address: addressComponents.street,
          city: addressComponents.city,
          postal_code: addressComponents.postalCode,
          country: addressComponents.country,
          capacity: values.capacity ? parseInt(values.capacity) : null,
          lanes: values.lanes ? parseInt(values.lanes) : null,
          length: values.length ? parseInt(values.length) : null,
          width: values.width ? parseInt(values.width) : null,
          depth_min: values.depth_min ? parseFloat(values.depth_min) : null,
          depth_max: values.depth_max ? parseFloat(values.depth_max) : null,
        };

        if (venueId) {
          // Update existing venue
          const { error } = await supabase
            .from('venues')
            .update(venueData)
            .eq('id', venueId);

          if (error) throw error;
        } else {
          // Create new venue
          const { error } = await supabase
            .from('venues')
            .insert([venueData]);

          if (error) throw error;
        }

        onSuccess?.();
        navigate('/venues');
      } catch (error) {
        console.error('Error saving venue:', error);
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelInput
            id="name"
            name="name"
            label="Venue Name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
            icon={<Building2 className="h-5 w-5" />}
          />
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Venue Type
            </label>
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="pool">Swimming Pool</option>
              <option value="complex">Sports Complex</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Location */}
      <Card title="Location">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address *
            </label>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onPlaceSelect={handlePlaceSelect}
              required
              error={errors.address}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                value={addressComponents.city}
                disabled
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Postal Code
              </label>
              <input
                type="text"
                value={addressComponents.postalCode}
                disabled
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <input
                type="text"
                value={addressComponents.country}
                disabled
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            icon={<Phone className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail className="h-5 w-5" />}
          />
          <div className="md:col-span-2">
            <FloatingLabelInput
              id="website"
              name="website"
              type="url"
              label="Website"
              value={values.website}
              onChange={handleChange}
              error={errors.website}
              icon={<Globe className="h-5 w-5" />}
            />
          </div>
        </div>
      </Card>

      {/* Pool Specifications */}
      <Card title="Pool Specifications">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingLabelInput
            id="capacity"
            name="capacity"
            type="number"
            label="Capacity"
            value={values.capacity}
            onChange={handleChange}
            error={errors.capacity}
            icon={<Users className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="lanes"
            name="lanes"
            type="number"
            label="Number of Lanes"
            value={values.lanes}
            onChange={handleChange}
            error={errors.lanes}
            icon={<Ruler className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="length"
            name="length"
            type="number"
            label="Length (meters)"
            value={values.length}
            onChange={handleChange}
            error={errors.length}
            icon={<Ruler className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="width"
            name="width"
            type="number"
            label="Width (meters)"
            value={values.width}
            onChange={handleChange}
            error={errors.width}
            icon={<Ruler className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="depth_min"
            name="depth_min"
            type="number"
            step="0.1"
            label="Minimum Depth (meters)"
            value={values.depth_min}
            onChange={handleChange}
            error={errors.depth_min}
            icon={<Waves className="h-5 w-5" />}
          />
          <FloatingLabelInput
            id="depth_max"
            name="depth_max"
            type="number"
            step="0.1"
            label="Maximum Depth (meters)"
            value={values.depth_max}
            onChange={handleChange}
            error={errors.depth_max}
            icon={<Waves className="h-5 w-5" />}
          />
        </div>
      </Card>

      {/* Features */}
      <Card title="Features">
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_diving_boards"
                checked={values.has_diving_boards}
                onChange={handleChange}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Has Diving Boards</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_timing_system"
                checked={values.has_timing_system}
                onChange={handleChange}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Has Electronic Timing System</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_indoor"
                checked={values.is_indoor}
                onChange={handleChange}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Indoor Facility</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_accessible"
                checked={values.is_accessible}
                onChange={handleChange}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Accessible Facility</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Additional Notes */}
      <Card title="Additional Notes">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/venues')}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : venueId ? 'Save Changes' : 'Create Venue'}
        </button>
      </div>
    </form>
  );
};