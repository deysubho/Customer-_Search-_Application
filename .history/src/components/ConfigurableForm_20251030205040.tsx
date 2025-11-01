import React from 'react';
import { SearchConfig, SearchFilters } from 'types';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Button } from 'components/ui/button';

interface ConfigurableFormProps {
  config: SearchConfig;
  onSubmit: (filters: SearchFilters) => void;
  loading?: boolean;
}

export const ConfigurableForm: React.FC<ConfigurableFormProps> = ({
  config,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState<SearchFilters>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value || undefined,
    }));
  };

  const sortedFields = Object.entries(config.fields).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedFields.map(([fieldName, fieldConfig]) => (
          <div key={fieldName} className="space-y-2">
            <Label htmlFor={fieldName}>{fieldConfig.label}</Label>
            <Input
              id={fieldName}
              type={fieldConfig.uiType === 'date' ? 'date' : 'text'}
              placeholder={fieldConfig.placeholder}
              value={formData[fieldName as keyof SearchFilters] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};