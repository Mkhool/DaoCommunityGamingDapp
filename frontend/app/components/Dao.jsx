'use client';

import { useState } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag } from '@chakra-ui/react';
import { useWriteContract } from 'wagmi';
import { DaoContractAddress, DaoContractAbi } from '@/constants';
import Events from './Events';

function DaoPage({ address, onSuccessAddProposal }) {

  const [proposalDescription, setProposalDescription] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: addProposal, isLoading: isProposalAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Proposal added successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setProposalDescription('');
        onSuccessAddProposal();
      },
      onError(error) {
        toast({
          title: "Failed to add proposal.",
          description: error.shortMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  });

  const handleProposalSubmission = () => {
    if (!proposalDescription.trim()) {
      toast({
        title: 'Description cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    addProposal({
      address: DaoContractAddress,
      abi: DaoContractAbi,
      functionName: "ProposeGame",
      account: address,
      args: [proposalDescription]
    });
  };

  // Voting
  // const [voteOptions, setVoteOptions] = useState([{}])

  // const getProposals = async () => {
  //   const tmpVoteOptions = []
  //   const proposalRegisteredEvent = await publicClient.getLogs({
  //     address: DaoContractAddress,
  //     event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
  //     fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
  //     toBlock: 'latest'
  //   })
  //   proposalRegisteredEvent.map(async event => {
  //     tmpVoteOptions.push({ id: event.args.proposalId, description: `Proposal ${event.args.proposalId}` })
  //   })
  //   setVoteOptions(tmpVoteOptions);
  // }

  // useEffect(() => {
  //   const getAllProposals = async () => {
  //     if (address !== undefined) {
  //       await getProposals();
  //     }
  //   }
  //   getAllProposals();
  // }, [address])

  return (
<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" width="100vw">
  <VStack spacing={4}>
    <Tag>Add a new proposal</Tag>
    <Input
      placeholder="Describe your proposal"
      value={proposalDescription}
      onChange={(e) => setProposalDescription(e.target.value)}
    />
    <Button
      onClick={handleProposalSubmission}
      isLoading={isProposalAdding}
    >
      Add Proposal
    </Button>
  </VStack>
  <Events/>
</Box>
  );
}

export default DaoPage;


//     <Box pl="150px" pt="100px" width="calc(100vw - 150px)">
//       <Tabs isFitted variant='enclosed' defaultIndex={1}>
//         <TabList mb="1em">
//           <Tab>Partenaire</Tab>
//           <Tab>Communauté</Tab>
//         </TabList>
//         <TabPanels>
//           <TabPanel>
//             <Box>
//               <Text mb={4}>Image de la proposition :</Text>
//               <Image src="src=/image/partenaire.png" alt="partenaire" />
//             </Box>
//           </TabPanel>
//           <TabPanel>
//             {/* Les propositions de la communauté comme précédemment */}
//             <Box mb={4}>
//               <Text mb={2}>Proposition 1</Text>
//               <Button colorScheme="blue">Voter</Button>
//             </Box>
//             <Box mb={4}>
//               <Text mb={2}>Proposition 2</Text>
//               <Button colorScheme="blue">Voter</Button>
//             </Box>
//             <Box>
//               <Text mb={2}>Proposition 3</Text>
//               <Button colorScheme="blue">Voter</Button>
//             </Box>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Box>
//   );
// }

// export default DaoPage;

