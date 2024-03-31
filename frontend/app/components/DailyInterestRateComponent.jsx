
import { useAccount, useReadContract } from 'wagmi';
import { StakingContractAddress, StakingContractAbi } from '@/constants';




function DailyInterestRateComponent() {
  const { data, isError, isLoading } = useReadContract({
    addressOrName: StakingContractAddress,
    contractInterface: StakingContractAbi,
    functionName: 'DailyInterestRate',
  });

  if (isLoading) return <div>Chargement du taux d'intérêt journalier...</div>;
  if (isError || !data) return <div>Erreur lors du chargement du taux d'intérêt journalier.</div>;

  // Le taux est retourné tel quel, assurez-vous de l'afficher comme vous le souhaitez
  const dailyInterestRate = data.toString();

  return (
    <div>
      Taux d'intérêt journalier : {dailyInterestRate} %
    </div>
  );
}

export default DailyInterestRateComponent;
