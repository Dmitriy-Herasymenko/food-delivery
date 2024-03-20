export const styles = {
  createButtonWrapper: 'mt-10 flex items-center justify-center gap-x-6',
  createButton: 'rounded-md bg-[#4F46E5] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  votingStatus: {
    container: ' bg-white p-6 rounded-md shadow-md',
    wrapper: 'mb-4',
    label: 'block text-sm font-medium text-gray-600',
    progressWrapper: 'mt-2',
    buttonSubmit: 'bg-blue-500 text-white p-2 rounded-md',
  },
  votingForm: {
    container: 'max-w-md mx-auto bg-white p-6 rounded-md shadow-md',
  },
  votedStatus: {
    wrapper: 'mt-4',
    label: 'text-lg font-semibold',
    progressWrapper: 'mt-2',
  },
  voteSubmission: {
    container: 'bg-white p-6 rounded-md shadow-md',
    wrapper: 'mb-4',
    label: 'block font-medium text-gray-600 text-3xl font-semibold mb-2',
    optionsWrapper: 'flex flex-col space-y-2',
    option: 'flex items-center space-x-2 p-1 mt-1',
    buttonSubmit: 'bg-[#4F46E5] mt-6  text-white p-2 rounded-md',
    radio:
      'w-4 h-4 text-blue-600 bg-[#4F46E5] border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
  },
};
