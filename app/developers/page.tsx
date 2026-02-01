'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Code,
  Badge,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from '@chakra-ui/react'
import {
  FiCode,
  FiBook,
  FiLock,
  FiZap,
  FiServer,
  FiGlobe,
  FiExternalLink,
  FiArrowRight,
} from 'react-icons/fi'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.coiep.com'
const API_DOCS_URL = process.env.NEXT_PUBLIC_API_DOCS_URL || 'https://api.coiep.com/api/docs'

const FeatureCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      p={6}
      bg={bgColor}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="lg"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.3s"
    >
      <Flex align="center" mb={4}>
        <Icon as={icon} boxSize={8} color="brand.500" />
      </Flex>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  )
}

const CodeBlock = ({ children, language = 'typescript' }: { children: string; language?: string }) => {
  const bgColor = useColorModeValue('gray.900', 'gray.900')

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      overflowX="auto"
      fontSize="sm"
    >
      <Code
        display="block"
        whiteSpace="pre"
        bg="transparent"
        color="green.300"
        fontFamily="mono"
      >
        {children}
      </Code>
    </Box>
  )
}

export default function DevelopersPage() {
  const bgGradient = useColorModeValue(
    'linear(to-b, white, gray.50)',
    'linear(to-b, gray.900, gray.800)'
  )
  const headingColor = useColorModeValue('gray.800', 'white')
  const subtextColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const bgGray = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      {/* Navigation */}
      <Box py={4} px={8} borderBottom="1px" borderColor={borderColor}>
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <Link href="/">
            <Heading size="lg" color="brand.500">CoIEP</Heading>
          </Link>
          <HStack spacing={4}>
            <Button
              as="a"
              href="/"
              variant="ghost"
            >
              Home
            </Button>
            <Button
              as="a"
              href={API_DOCS_URL}
              variant="ghost"
              rightIcon={<FiExternalLink />}
            >
              API Docs
            </Button>
            <Button
              as="a"
              href={`${APP_URL}/login`}
              colorScheme="brand"
            >
              Sign In
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Hero Section */}
      <Box bg="brand.500" py={16}>
        <Container maxW="1200px">
          <VStack spacing={6} textAlign="center">
            <Badge colorScheme="green" fontSize="md" px={4} py={1}>
              Developer API
            </Badge>
            <Heading
              size="3xl"
              fontWeight="bold"
              color="white"
              lineHeight="1.2"
            >
              Build Integrations with COIEP
            </Heading>
            <Text fontSize="xl" color="blue.50" maxW="2xl">
              Connect your Student Information System (SIS) to COIEP.
              Sync student data, export IEPs, and automate workflows.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button
                as="a"
                href={API_DOCS_URL}
                size="lg"
                colorScheme="whiteAlpha"
                color="white"
                variant="outline"
                rightIcon={<FiExternalLink />}
              >
                View API Documentation
              </Button>
              <Button
                as="a"
                href={`${APP_URL}/request-access`}
                size="lg"
                bg="white"
                color="brand.500"
                _hover={{ bg: 'gray.100' }}
              >
                Request API Access
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="1200px" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color={headingColor}>
              API Capabilities
            </Heading>
            <Text fontSize="lg" color={subtextColor} maxW="2xl">
              Everything you need to integrate COIEP with your educational technology stack
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <FeatureCard
              icon={FiServer}
              title="Student Sync"
              description="Import and sync student rosters from Infinite Campus, PowerSchool, or any SIS with our bulk sync API."
            />
            <FeatureCard
              icon={FiBook}
              title="IEP Export"
              description="Export completed IEPs in JSON, XML, or CSV format for import into Frontline, IEP Direct, or your compliance system."
            />
            <FeatureCard
              icon={FiZap}
              title="Real-time Webhooks"
              description="Receive instant notifications when IEPs are created, completed, or exported for automated workflows."
            />
            <FeatureCard
              icon={FiLock}
              title="Secure API Keys"
              description="Organization-scoped API keys with granular permissions and automatic FERPA audit logging."
            />
            <FeatureCard
              icon={FiGlobe}
              title="Standards Alignment"
              description="Access state-specific educational standards from all 50 states for goal alignment."
            />
            <FeatureCard
              icon={FiCode}
              title="SDKs & Examples"
              description="Integration examples for popular platforms including Frontline, Infinite Campus, PowerSchool, and Goalbook."
            />
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Code Examples */}
      <Box bg={bgGray} py={20}>
        <Container maxW="1200px">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={headingColor}>
                Quick Start
              </Heading>
              <Text fontSize="lg" color={subtextColor} maxW="2xl">
                Get started with the COIEP API in minutes
              </Text>
            </VStack>

            <Tabs variant="enclosed" w="full">
              <TabList>
                <Tab>Authentication</Tab>
                <Tab>List Students</Tab>
                <Tab>Export IEP</Tab>
                <Tab>Webhooks</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Text>
                      All API requests require an API key passed in the <Code>X-API-Key</Code> header.
                      Request an API key from your COIEP admin dashboard.
                    </Text>
                    <CodeBlock>{`// Example API request with authentication
const response = await fetch('https://api.coiep.com/api/v1/public/health', {
  headers: {
    'X-API-Key': 'your-api-key-here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
// { status: 'healthy', organization: 'Example School District', apiVersion: 'v1' }`}</CodeBlock>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Text>
                      Retrieve a paginated list of students for your organization.
                      Filter by grade level or search by name.
                    </Text>
                    <CodeBlock>{`// List students with pagination
const response = await fetch(
  'https://api.coiep.com/api/v1/public/students?page=1&pageSize=20&gradeLevel=5',
  {
    headers: {
      'X-API-Key': 'your-api-key-here'
    }
  }
);

const { students, total, page, pageSize } = await response.json();
// students: [{ id, externalId, firstName, lastName, gradeLevel, disability }]`}</CodeBlock>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Text>
                      Export a complete IEP session with PLAAFP, goals, SDI, and SAS content.
                      Supports JSON, XML, and CSV formats.
                    </Text>
                    <CodeBlock>{`// Export IEP in JSON format
const response = await fetch(
  'https://api.coiep.com/api/v1/public/iep-sessions/session-123/export?format=json',
  {
    headers: {
      'X-API-Key': 'your-api-key-here'
    }
  }
);

const iep = await response.json();
// {
//   id: 'session-123',
//   studentInfo: { name, gradeLevel, disability },
//   plaafp: { content, generatedAt },
//   goals: { content, objectives },
//   sdi: { content, accommodations, modifications },
//   sas: { content, services }
// }`}</CodeBlock>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Text>
                      Register a webhook URL to receive real-time notifications
                      when IEP events occur.
                    </Text>
                    <CodeBlock>{`// Register a webhook
const response = await fetch('https://api.coiep.com/api/v1/public/webhooks', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://your-server.com/webhooks/coiep',
    events: ['iep.created', 'iep.completed', 'iep.exported'],
    secret: 'your-webhook-secret' // For signature verification
  })
});

// Webhook payload format:
// {
//   event: 'iep.completed',
//   timestamp: '2024-01-15T10:30:00Z',
//   organizationId: 'org-123',
//   data: { iepSessionId: 'session-123', studentId: 'student-456' }
// }`}</CodeBlock>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>

      {/* Supported Platforms */}
      <Container maxW="1200px" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color={headingColor}>
              Supported Integrations
            </Heading>
            <Text fontSize="lg" color={subtextColor} maxW="2xl">
              COIEP integrates with leading educational technology platforms
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={8} w="full">
            {['Frontline IEP', 'Infinite Campus', 'PowerSchool', 'Goalbook', 'IEP Direct'].map((platform) => (
              <Box
                key={platform}
                p={6}
                bg={bgColor}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="lg"
                textAlign="center"
              >
                <Text fontWeight="bold" color={headingColor}>{platform}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA */}
      <Box
        bgGradient="linear(to-r, brand.500, brand.600)"
        color="white"
        py={16}
      >
        <Container maxW="1200px">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">
              Ready to Build?
            </Heading>
            <Text fontSize="lg" maxW="xl">
              Request API access to start building your integration today.
              Our team is here to help you succeed.
            </Text>
            <HStack spacing={4}>
              <Button
                as="a"
                href={API_DOCS_URL}
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                rightIcon={<FiExternalLink />}
              >
                API Documentation
              </Button>
              <Button
                as="a"
                href={`${APP_URL}/request-access`}
                size="lg"
                bg="white"
                color="brand.500"
                _hover={{ bg: 'gray.100' }}
                rightIcon={<FiArrowRight />}
              >
                Request API Access
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        py={12}
        borderTop="1px"
        borderColor={borderColor}
        bg={bgGray}
      >
        <Container maxW="1200px">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <VStack align="start" spacing={2}>
              <Heading size="md">
                <Text as="span" color="brand.500">Co</Text>
                <Text as="span" color={headingColor}>IEP</Text>
              </Heading>
              <Text color={subtextColor} fontSize="sm">
                &copy; 2025 CoIEP. All rights reserved.
              </Text>
            </VStack>
            <HStack spacing={6}>
              <Link href="/" color={subtextColor} _hover={{ color: 'brand.500' }}>Home</Link>
              <Link href={API_DOCS_URL} color={subtextColor} _hover={{ color: 'brand.500' }} isExternal>API Docs</Link>
              <Link href="/privacy" color={subtextColor} _hover={{ color: 'brand.500' }}>Privacy</Link>
              <Link href="/terms" color={subtextColor} _hover={{ color: 'brand.500' }}>Terms</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
