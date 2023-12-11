// voteScheduler.ts
import { Vote } from './vote.model';
import { Op } from 'sequelize';

const closeVotes = async () => {
  try {
    const openVotesPastEndDate = await Vote.findAll({
        where: {
          isOpen: true,
          endDate: { [Op.lte]: new Date() },
        },
      });
  
      console.log(`Found ${openVotesPastEndDate.length} open votes to close.`);

    const updates = openVotesPastEndDate.map(async (vote) => {
      try {
        console.log(`Before update - Vote ${vote.id} isOpen: ${vote.isOpen}`);
        await vote.update({ isOpen: false });
        console.log(`After update - Vote ${vote.id} isOpen: ${vote.isOpen}`);
        console.log(`Vote ${vote.id} closed`);
      } catch (updateError) {
        console.error(`Error updating vote ${vote.id}:`, updateError);
      }
    });

    await Promise.all(updates);

    console.log('Votes closed');
  } catch (error) {
    console.error('Error when closing voting:', error);
  }
};

export const startVoteScheduler = () => {
  const interval = 24 * 60 * 60 * 1000;
  closeVotes();
  setInterval(closeVotes, interval);
};
