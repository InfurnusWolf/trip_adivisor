import React, { useState } from 'react';
import './App.css';

const PreferenceSection = ({ title, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className={`w-full text-left p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg mt-2.5 transition-colors ${
          isOpen ? 'bg-green-600' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="pl-5 mt-2.5">
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  value={option.value}
                  onChange={(e) => onChange(e.target.value, e.target.checked)}
                  className="form-checkbox"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    fromDestination: '',
    toDestination: '',
    fromDate: '',
    toDate: '',
    budgetMin: '',
    budgetMax: '',
    adults: 1,
    children: 0,
    preferences: {
      adventure: [],
      food: [],
      sightseeing: [],
      touristAttractions: [],
      relaxation: []
    }
  });

  const preferenceOptions = {
    adventure: [
      { value: 'extreme-sports', label: 'Extreme Sports' },
      { value: 'mountain-climbing', label: 'Mountain Climbing' },
      { value: 'water-sports', label: 'Water Sports' },
      { value: 'hiking', label: 'Hiking' }
    ],
    food: [
      { value: 'local-cuisine', label: 'Local Cuisine' },
      { value: 'street-food', label: 'Street Food' },
      { value: 'fine-dining', label: 'Fine Dining' }
    ],
    sightseeing: [
      { value: 'beaches', label: 'Beaches' },
      { value: 'parks', label: 'Parks' },
      { value: 'monuments', label: 'Monuments' }
    ],
    touristAttractions: [
      { value: 'historical-sites', label: 'Historical Sites' },
      { value: 'amusement-parks', label: 'Amusement Parks' },
      { value: 'wildlife-parks', label: 'Wildlife Parks' }
    ],
    relaxation: [
      { value: 'spa', label: 'Spa' },
      { value: 'yoga', label: 'Yoga' },
      { value: 'beach-resorts', label: 'Beach Resorts' }
    ]
  };

  const handlePreferenceChange = (category, value, checked) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: checked
          ? [...prev.preferences[category], value]
          : prev.preferences[category].filter(item => item !== value)
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTotalTravelers = () => {
    return parseInt(formData.adults) + parseInt(formData.children) || 1;
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] to-[#9face6] flex justify-center items-center p-4">
      <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[95vh]">
        <h1 className="text-2xl md:text-3xl text-center text-blue-500 font-bold mb-6">
          AI Trip Planner
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              From Destination
            </label>
            <input
              type="text"
              name="fromDestination"
              value={formData.fromDestination}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
              placeholder="Enter starting point"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              To Destination
            </label>
            <input
              type="text"
              name="toDestination"
              value={formData.toDestination}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
              placeholder="Enter destination point"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-700">Preferences</h3>
          
          <PreferenceSection
            title="Adventure"
            options={preferenceOptions.adventure}
            onChange={(value, checked) => handlePreferenceChange('adventure', value, checked)}
          />
          
          <PreferenceSection
            title="Food"
            options={preferenceOptions.food}
            onChange={(value, checked) => handlePreferenceChange('food', value, checked)}
          />
          
          <PreferenceSection
            title="Site-Seeing"
            options={preferenceOptions.sightseeing}
            onChange={(value, checked) => handlePreferenceChange('sightseeing', value, checked)}
          />
          
          <PreferenceSection
            title="Tourist Attractions"
            options={preferenceOptions.touristAttractions}
            onChange={(value, checked) => handlePreferenceChange('touristAttractions', value, checked)}
          />
          
          <PreferenceSection
            title="Relaxation"
            options={preferenceOptions.relaxation}
            onChange={(value, checked) => handlePreferenceChange('relaxation', value, checked)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Minimum Budget (INR)
              </label>
              <input
                type="number"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                placeholder="Enter Min budget"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Maximum Budget (INR)
              </label>
              <input
                type="number"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                placeholder="Enter max budget"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Adults (age 14+)
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleInputChange}
                min="0"
                max="10"
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Children (age below 14)
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
                min="0"
                max="10"
                className="w-full p-3 border rounded-lg focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <p className="text-lg font-semibold text-blue-500">
            Total Travelers: {getTotalTravelers()}
          </p>

          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg font-semibold transition-colors"
          >
            Generate Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;