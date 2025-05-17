import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  email: yup.string().email("Should be an Email").required('email is required'),
  club: yup.string().required("club's name is required"),
});

const AddUser = ({user,setUser}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });




  const onSubmit = (data) => {
    console.log('Form data:', { ...data });
    setUser(false)
    // Handle your form submission logic here
  };




  return (
 
    <div style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
    className='absolute top-10 right-30 w-100 m-auto flex flex-col items-center bg-[#f7f6fe] p-15 '
    >
      <span
      onClick={()=>{setUser(false)}}
      className='btn p-0 size-10 rounded-full absolute top-5 left-5 animate-pulse'
      >x</span>  
      <h2 className='text-2xl font-extrabold text-gray-800 mb-2 mx-auto '>Add User</h2>
      <p className='text-[.8rem] text-gray-500'>
      Create a user to manage a Club
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}
        className='w-80'
        >
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#495057' }} className='mt-6 pl-1 text-sm'>Email</label>
          <input
            type="text"
            id="email"
            {...register('email')}
            style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
            className='bg-white'
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="club" style={{ display: 'block', marginBottom: '5px', color: '#495057' }} className='mt-8 pl-1 text-sm'>club</label>
          <input
            type='text'
            id="club"
            {...register('club')}
            style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}  className='bg-white'
          />
          {errors.club && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.club.message}</p>}
        </div>

     

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="submit"
            className='btn m-auto w-60  cursor-pointer text-white border'
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  
  );
};

export default AddUser;