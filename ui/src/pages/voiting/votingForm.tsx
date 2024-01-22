import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { HandleCreateVoting, CreatingVoting} from './types';
import { format } from 'date-fns';
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
    console.log("creatingVoting", creatingVoting)
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Назва голосування
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
            Початок голосування
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            className="block text-sm font-medium text-gray-600"
            dateFormat="Pp"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
            Закінчення голосування
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            className="block text-sm font-medium text-gray-600"
            dateFormat="Pp"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="options" className="block text-sm font-medium text-gray-600">
            Опції
          </label>
          <div className="flex flex-col space-y-2">
            {creatingVoting?.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{option.description}</span>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              id="newOption"
              name="newOption"
              value={newOption.option}
              onChange={(e) => setNewOption({ ...newOption, option: e.target.value, description: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-2 bg-green-500 text-white p-2 rounded-md"
            >
              Додати опцію
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md mb-4"
        >
          Створити голосування
        </button>
      </form>
    </div>
  );
};

