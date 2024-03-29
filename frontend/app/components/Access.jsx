    // //////////////////////////////// ACCESS ///////////////////////////////////////////////

    // const { data: getVoter } = useReadContract({
    //     address: DaoContractAddress,
    //     abi: contractAbi,
    //     functionName: 'GetVoter',
    //     account: address,
    //     args: [address],
    // });

    // useEffect(() => {
    //     const addressLower = address?.toLowerCase();
    //     if (addressLower === isOwnerData?.toLowerCase()) {
    //         setUserRights('admin');
    //     } else if (getVoter?.isRegistered) {
    //         setUserRights('voter');
    //     } else if (addressLower) {
    //         setUserRights('unregistered');
    //     } else {
    //         setUserRights(null);
    //     }
    // }, [address, getVoter, isOwnerData]);

    // const setNextPhase = function () {
    //     getEvents();
    //     refetchWorkflowStatus();
    // }

    // switch (userRights) {
    //     case 'loading':
    //         return (
    //             <Box  display="flex" alignItems="center" justifyContent="center" p={5} shadow="md" borderWidth="1px" borderColor="gray.50" bgColor="gray.50" borderRadius="lg" width="full" maxWidth="full">
    //                 <Spinner />
    //             </Box>
    //         );
    //     case 'admin':
    //         return <AdminAccess
    //             workflowStatus={getWorkflowStatus}
    //             onSuccessfulNextPhase={setNextPhase}
    //             setRefreshEvents={getEvents}
    //             address={address}
    //             events={events}
    //         />;
    //     case 'voter':
    //         return <VoterAccess
    //             workflowStatus={getWorkflowStatus}
    //             address={address}
    //             options={voteOptions}
    //             events={events}
    //             onSuccessAddProposal={getEvents}
    //             refreshEvents={getEvents}
    //         />;
    //     case 'unregistered':
    //         return <UnregisteredUser
    //             workflowStatus={getWorkflowStatus}
    //             address={address}
    //         />;
    //     case null:
    //         if (!isConnecting) {
    //             return <RestrictedAccess />;
    //         }
    //     default:
    //         return <NotConnected />;
    // }