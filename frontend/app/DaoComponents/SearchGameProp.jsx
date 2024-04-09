import { useState, } from 'react';
import { useReadContract } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import Quorum from './Quorum';

function SearchGameProp({ initialProposalId }) {

  const [proposalId, setProposalId] = useState(initialProposalId || '');
  const { data, isError, isLoading } = useReadContract({
    address: ContractAddress,
    abi: ContractAbi,
    functionName: 'GetProposal',
    args: [proposalId],
    enabled: proposalId !== '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

  };


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input color='black'
          id="proposalId"
          type="text"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
        />
      </form>

      {isLoading && <div>rechargement...</div>}
      {isError || !data ? (
        <div>Numéro ID</div>
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
  );
}

export default SearchGameProp;