import { styles } from "./styles";

interface VotingStatusProps {
  votingStatus: boolean;
  votesCount: number;
}

export const VotingStatus: React.FC<VotingStatusProps> = ({
  votingStatus,
  votesCount,
}) => {
  return (
    <div className={styles.votingStatus.container}>
      {votingStatus !== null && !votingStatus && (
        <form>
          <div className={styles.votingStatus.wrapper}>
            <label className={styles.votingStatus.label}>
              Кількість проголосувавших
            </label>
            <p>{votesCount}</p>
          </div>

          <div className={styles.votingStatus.wrapper}>
            <label className={styles.votingStatus.label}>Проголосували</label>
            <p></p>
          </div>

          <div className={styles.votingStatus.progressWrapper}>
            {/* Тут можна додати прогрес-бар для відображення результатів голосування */}
          </div>

          <button type="submit" className={styles.votingStatus.buttonSubmit}>
            Відправити голосування
          </button>
        </form>
      )}

      {votingStatus && (
        <div className={styles.votedStatus.wrapper}>
          <p className={styles.votedStatus.label}>Голосування завершено</p>
          <p>Кількість проголосувавших: {votesCount}</p>
          <p>Проголосували: </p>
          <div className={styles.votedStatus.progressWrapper}>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
