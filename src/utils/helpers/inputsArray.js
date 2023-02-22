export const inputsArray = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "name",
    label: "Name",
    required: true,
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "username",
    label: "Username",
    required: true,
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "email",
    label: "Email",
    required: true,
  },
  {
    id: 4,
    address: {
      street: {
        id: 1,
        name: "street",
        type: "text",
        placeholder: "City",
        label: "City",
        required: true,
      },
      suite: {
        id: 2,
        name: "suite",
        type: "text",
        placeholder: "Suite",
        label: "Suite",
        required: true,
      },
      city: {
        id: 3,
        name: "city",
        type: "text",
        placeholder: "City",
        label: "City",
        required: true,
      },
    },
  },
];

export const errorMessages = {
  name: "Name is required",
  username: "Username is required",
  email: "Email is required",
  street: "Street is required",
  suite: "Suite is required",
  city: "City is required",
};
