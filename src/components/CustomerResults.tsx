import * as React from 'react';
import { Customer, DisplayConfig } from 'types';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

interface CustomerResultsProps {
  customers: Customer[];
  config: DisplayConfig;
  loading?: boolean;
  error?: string;
}

export const CustomerResults: React.FC<CustomerResultsProps> = ({
  customers,
  config,
  loading = false,
  error,
}: CustomerResultsProps) => {
  const sortedFields = Object.entries(config.fields).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No customers found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Search Results ({customers.length})</h2>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {sortedFields.map(([fieldKey, fieldConfig]) => (
                  <th key={fieldKey} className="border border-gray-200 px-4 py-2 text-left">
                    {fieldConfig.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  {sortedFields.map(([fieldKey, fieldConfig]) => (
                    <td key={fieldKey} className="border border-gray-200 px-4 py-2">
                      {fieldConfig.getValue(customer)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {config.fields.name?.getValue(customer)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedFields.slice(1).map(([fieldKey, fieldConfig]) => (
                  <div key={fieldKey} className="flex justify-between">
                    <span className="font-medium">{fieldConfig.label}:</span>
                    <span>{fieldConfig.getValue(customer)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};