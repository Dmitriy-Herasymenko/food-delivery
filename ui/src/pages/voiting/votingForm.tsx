import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { HandleCreateVoting, CreatingVoting} from './types';
import { format } from 'date-fns';
import {
MdAdd,
MdRemove
} from 'react-icons/md';
import { styles } from './styles';
import 'react-datepicker/dist/react-datepicker.css';


interface VotingFormProps {
  setCreatingVoting:  React.Dispatch<React.SetStateAction<CreatingVoting>>;
  creatingVoting: CreatingVoting; 
  handleCreateVoting: (dataVotingRequest:HandleCreateVoting) => void;
}

export const VotingForm: React.FC<VotingFormProps> = ({setCreatingVoting, creatingVoting, handleCreateVoting}) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [newOption, setNewOption] = useState({ option: '', description: '' });

  const handleSubmit = () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"): '';
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : '';
    handleCreateVoting({formattedStartDate, formattedEndDate, title, votes: creatingVoting?.options});
  };

  const handleAddOption = () => {
    setCreatingVoting({
      ...creatingVoting,
      options: [...creatingVoting?.options, newOption],
    });
    setNewOption({ option: '', description: '' });
  };

  const handleRemoveOption = (indexRemove:number) => {
    const updatedOptions = creatingVoting?.options.filter((_, index) => index !== indexRemove);
    setCreatingVoting({
      ...creatingVoting,
      options: updatedOptions,
    });
  };

  return (
    <div className={styles.votingForm.container}>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='first-name' className='block text-sm leading-6 text-white'>
            Назва голосування
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                name='first-name'
                id='first-name'
                onChange={(e) => setTitle(e.target.value)}
                className='block bg-[#2a3447] w-full rounded-md border-[#333f55] px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

        <div className='mt-10'>
          <label htmlFor='startDate' className='block text-sm  leading-6 text-white'>
            Початок голосування
          </label>
          <div className='mt-2.5'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            className='block bg-[#2a3447] w-full rounded-md border-0 px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            dateFormat='Pp'
          />
          </div>
        </div>

        <div className='mt-10'>
          <label htmlFor='endDate' className='block text-sm leading-6 text-white'>
            Закінчення голосування
          </label>
          <div className='mt-2.5'>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            className='block bg-[#2a3447] w-full rounded-md border-0 px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            dateFormat='Pp'
          />
          </div>
        </div>


        <div className='mt-10'>
          <label htmlFor='options' className='block text-sm text-white'>
            Опції
          </label>
          <div className='flex flex-col space-y-2  p-1'>
            {creatingVoting?.options.map((option, index) => (
              <div key={index} className='flex items-center justify-between space-x-2 block bg-[#2a3447]  w-full rounded-md border-0 px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                <span>{option.description}</span>
                <MdRemove onClick={() => handleRemoveOption(index)} className='text-2xl text-red-500 ml-2.5 group-hover:text-white cursor-pointer'/>
              </div>
            ))}
          </div>
          <div className='mt-2.5 flex items-center'>
            <input
              type='text'
              id='newOption'
              name='newOption'
              value={newOption.option}
              onChange={(e) => setNewOption({ ...newOption, option: e.target.value, description: e.target.value })}
              className='block bg-[#2a3447] w-full rounded-md border-0 px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <MdAdd onClick={handleAddOption} className='text-2xl text-[#4F46E5] ml-2.5 group-hover:text-white cursor-pointer' />
          </div>
        </div>

        <button
          type='submit'
          className='mt-10 bg-[#5d87ff] text-white p-2 rounded-md mb-4'
        >
          Створити голосування
        </button>
      </form>
    </div>
  );
};

