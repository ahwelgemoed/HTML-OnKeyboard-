import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from './Keyboard';
import './style.css';

export function App() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <React.Fragment>
      <a href="#">Test Link as a tags can 'focusin'</a>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register('firstName')} placeholder="First Name" />
        <input
          {...register('lastName', { required: true })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>Last name is required.</p>}
        <input type="submit" />
      </form>
      <Keyboard />
    </React.Fragment>
  );
}
