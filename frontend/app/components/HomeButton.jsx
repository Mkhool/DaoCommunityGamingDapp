import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
 
function HomePageButton() {
    return (
        <Link href="/dashboard" passHref>
            <Button
            className={inter.className}
                fontSize='xl'
                as='b'
                justifyContent="flex-start"
                variant="ghost"
                width="full"
                _hover={{ bg: 'purple.500', color: 'white' }}
                iconSpacing={2}
                color="#BFA181"
                onClick={() => router.push(href)}
                style={{ textDecoration: 'none' }}
                ml="100px"
            >
                UnityQuest
            </Button>
        </Link>
    );
}

export default HomePageButton;