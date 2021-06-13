import React from 'react';
import { Input } from 'reactstrap';

export default ({ input, field }) => {
  return (
    <Input type={field.type} {...input} />
  );
}
