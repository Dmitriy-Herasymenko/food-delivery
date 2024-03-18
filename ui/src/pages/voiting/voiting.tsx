import { useState, useEffect } from 'react';
import { VoteOption, GetVoting, CreateVoting } from '../../shared/api';
import { VotingForm, VoteSubmission, VotingStatus } from './';
import { Voting, HandleCreateVoting, CreatingVoting, CreateVote } from './types';
import { styles } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

const VOITING_OBJ = {
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  options: [],
}

export const Voiting = () => {
  const [userId] = useState<string>(localStorage.getItem('userId') || '');
  const [idVote, setIdVote] = useState<string>('');
  const [titleVote, setTitleVote] = useState<string>('');
  const [isVote, setIsVote] = useState<boolean>(true);
  const [isOpenVote, setIsOpenVote] = useState<boolean>(false);
  const [isCreateVoted, setIsCreatedVoted] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [votingStatus, setVotingStatus] = useState<boolean>(false);
  const [votesCount, setVotesCount] = useState<number>(0);
  const [creatingVoting, setCreatingVoting] = useState<CreatingVoting>(VOITING_OBJ);

  const requestVoting = async () => {
    try {
      const res = await GetVoting();

      if (res?.data) {
        const isVote = res?.data.find((vote:Voting) => vote.isOpen === true);

        if (isVote) {
          setIsCreatedVoted(true);
          setOptions(isVote.votes);
          setIdVote(isVote.id);
          setVotesCount(isVote?.usersIdVoted?.length);
          setTitleVote(isVote?.title);
          const currentId = isVote?.usersIdVoted?.includes(userId);

          if (currentId) {
            setVotingStatus(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching voting data:', error);
    }
  };

  const handleCreateVote = () => {
    setIsOpenVote(true);
    setIsVote(false);
  };

  const handleCreateVoting = async ({
    formattedStartDate,
    formattedEndDate,
    title,
    votes,
  }:HandleCreateVoting) => {
    setIsCreatedVoted(true);
    setIsOpenVote(false);
    setIsVote(false);

    const data: CreateVote = {
      userId,
      isOpen: true,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      title,
      votes,
    };

    try {
      const response = await CreateVoting(data);
      console.log('response', response);
    } catch (error) {
      console.error('Error creating voting:', error);
    }
  };

  const handleVoteSubmission = async (idVotedOption: string) => {
    const data = {
      id: idVote,
      userId: userId,
      idVote: idVotedOption,
    };

    try {
      await VoteOption(data);
      await requestVoting();
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  useEffect(() => {
    requestVoting();
  }, []);

  return (
    <>
      {!isCreateVoted && isVote && (
               <div className={styles.createButtonWrapper}>
               <a
                 href='#'
                 onClick={handleCreateVote}
                 className={styles.createButton}
               >
                  Створити голосування
               </a>
             </div>
      )}

      {isOpenVote && (
        <VotingForm
          creatingVoting={creatingVoting}
          setCreatingVoting={setCreatingVoting}
          handleCreateVoting={handleCreateVoting}
        />
      )}

      {isCreateVoted && votingStatus && (
        <VotingStatus votingStatus={votingStatus} votesCount={votesCount} />
      )}

      {!votingStatus && isCreateVoted && (
        <VoteSubmission
          titleVote={titleVote}
          options={options}
          onSubmit={handleVoteSubmission}
        />
      )}
    </>
  );
};
