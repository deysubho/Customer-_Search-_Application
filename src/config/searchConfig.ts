import { SearchConfig, DisplayConfig, Customer } from 'types';

export const searchConfig: SearchConfig = {
  fields: {
    firstName: {
      uiType: 'input',
      label: 'First Name',
      renderOrder: 1,
      placeholder: 'Enter first name',
    },
    lastName: {
      uiType: 'input',
      label: 'Last Name',
      renderOrder: 2,
      placeholder: 'Enter last name',
    },
    dateOfBirth: {
      uiType: 'date',
      label: 'Date of Birth',
      renderOrder: 3,
    },
  },
};

export const displayConfig: DisplayConfig = {
  fields: {
    name: {
      label: 'Name',
      renderOrder: 1,
      getValue: (customer: Customer) => `${customer.firstName} ${customer.lastName}`,
    },
    dateOfBirth: {
      label: 'Date of Birth',
      renderOrder: 2,
      getValue: (customer: Customer) => new Date(customer.dateOfBirth).toLocaleDateString(),
    },
    primaryPhone: {
      label: 'Primary Phone',
      renderOrder: 3,
      getValue: (customer: Customer) => {
        const primary = customer.phones.find(p => p.isPrimary);
        return primary?.number || 'N/A';
      },
    },
    primaryEmail: {
      label: 'Primary Email',
      renderOrder: 4,
      getValue: (customer: Customer) => {
        const primary = customer.emails.find(e => e.isPrimary);
        return primary?.address || 'N/A';
      },
    },
  },
};