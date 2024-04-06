import { useReadContract } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import { useState } from 'react';
function GameProposal() {
  const [proposalId, setProposalId] = useState('');
  const { data, isError, isLoading } = useReadContract({
    address: ContractAddress, 
    abi: ContractAbi, 
    functionName: 'GetProposal', 
    args: [proposalId], 
    enabled: proposalId !== '', 
  });


  const handleSubmit = (event) => {
    event.preventDefault(); 
  }

    return (
<div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="proposalId">Enter Proposal ID:</label>
        <input
          id="proposalId"
          type="text"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
        />
        <button type="submit" style={{ color: 'black' }}>Submit</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError || !data ? (
        <div>No game with this ID</div>
      ) : (
        <div>
          <h2>Proposal Details</h2>
          <p>ID: {data[0]}</p>
          <p>Name: {data[1]}</p>
          <p>Vote Count: {data[2]}</p>
          <p>Is Accepted: {data[3] ? 'Yes' : 'No'}</p>
          <p>Quorum: {data[4]}</p>
        </div>
      )}
    </div>
  );
}

export default GameProposal;
