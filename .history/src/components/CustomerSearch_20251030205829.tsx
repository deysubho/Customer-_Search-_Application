import { useState } from 'react';
import { Customer, SearchFilters } from 'types';
import { ConfigurableForm } from './ConfigurableForm';
import { CustomerResults } from './CustomerResults';
import { searchConfig, displayConfig } from 'config/searchConfig';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

export const CustomerSearch: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const searchCustomers = async (filters: SearchFilters) => {
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.firstName) {
        queryParams.append('firstName_like', filters.firstName);
      }
      if (filters.lastName) {
        queryParams.append('lastName_like', filters.lastName);
      }
      if (filters.dateOfBirth) {
        queryParams.append('dateOfBirth', filters.dateOfBirth);
      }

      const response = await fetch(`http://localhost:3001/customers?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Customer Search</h1>
        <p className="text-gray-600">Search for customers using the form below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ConfigurableForm
            config={searchConfig}
            onSubmit={searchCustomers}
            loading={loading}
          />
        </CardContent>
      </Card>

      {hasSearched && (
        <CustomerResults
          customers={customers}
          config={displayConfig}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};