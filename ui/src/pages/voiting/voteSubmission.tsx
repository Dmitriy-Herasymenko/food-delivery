import { useState } from "react";
import { styles } from "./styles";

interface options {
  description: string;
  id: string;
  option: string;
  voteCount: number;
}

interface VoteSubmissionProps {
  titleVote: string;
  options: options[];
  onSubmit: (idVote: string) => void;
}

export const VoteSubmission: React.FC<VoteSubmissionProps> = ({
  titleVote,
  options,
  onSubmit,
}) => {
  const [idVote, setIdVote] = useState<string>("");

  const handleOptionChange = (optionId: string) => setIdVote(optionId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(idVote);
  };

  return (
    <div className={styles.voteSubmission.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="options" className={styles.voteSubmission.label}>
          {titleVote}
        </label>
        {options.map((option, index) => (
          <div key={index} className={styles.voteSubmission.option}>
            <input
              type="radio"
              name="options"
              className={styles.voteSubmission.radio}
              value={option.id}
              checked={idVote === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
            <label>{option.description}</label>
          </div>
        ))}

        <button type="submit" className={styles.voteSubmission.buttonSubmit}>
          Відправити голос
        </button>
      </form>
    </div>
  );
};
