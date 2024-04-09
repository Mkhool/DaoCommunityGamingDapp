import { useReadContract } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import { useState, useEffect } from 'react';
import Quorum from './Quorum';

function GameProposal({ initialProposalId }) {
  const [proposalId, setProposalId] = useState(initialProposalId || '');
  const { data, isError, isLoading } = useReadContract({
    address: ContractAddress,
    abi: ContractAbi,
    functionName: 'GetProposal',
    args: [proposalId],
    enabled: proposalId !== '',
  });

  useEffect(() => {
    if (initialProposalId) {
      setProposalId(initialProposalId);
    }
  }, [initialProposalId]);

  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError || !data ? (
        <div>No game with this ID</div>
      ) : (
        <div>
          <h2>Proposal Details</h2>
          <p>ID: {initialProposalId || proposalId}</p>
          <p>Name: {data[1]}</p>
          <p>Vote Count: {Number(data[2] / BigInt(1e18)).toString()}</p>
          <p>Is Accepted: {data[3] ? 'Yes' : 'No'}</p>
          <p><Quorum /></p>
        </div>
      )}
    </div>
  )
}

export default GameProposal;
