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
  Stack,
  Badge,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Progress
} from '@chakra-ui/react'
import {
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiZap,
  FiShield,
  FiArrowRight,
  FiMessageSquare,
  FiSend,
  FiClipboard,
  FiUpload
} from 'react-icons/fi'
import { FaRobot, FaFileAlt } from 'react-icons/fa'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.coiep.com'

const Feature = ({ icon, title, description }: { icon: any; title: string; description: string }) => {
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
      <Text color="gray.600" whiteSpace="pre-line">{description}</Text>
    </Box>
  )
}

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-b, white, gray.50)',
    'linear(to-b, gray.900, gray.800)'
  )
  const headingColor = useColorModeValue('gray.800', 'white')
  const subtextColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const bgGray = useColorModeValue('gray.50', 'gray.900')
  const bgGray100 = useColorModeValue('gray.100', 'gray.700')
  const brandBg = useColorModeValue('brand.50', 'brand.900')

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      {/* Navigation */}
      <Box py={4} px={8} borderBottom="1px" borderColor={borderColor}>
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <Heading size="lg" color="brand.500">CoIEP</Heading>
          <HStack spacing={4}>
            <Button
              as="a"
              href="/developers"
              variant="ghost"
            >
              Developers
            </Button>
            <Button
              as="a"
              href={`${APP_URL}/login`}
              variant="ghost"
            >
              Sign In
            </Button>
            <Button
              as="a"
              href={`${APP_URL}/request-access`}
              colorScheme="brand"
            >
              Request Access
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Hero Section */}
      <Box bg="brand.500" py={20}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
            <VStack align={{ base: "center", lg: "start" }} spacing={6} textAlign={{ base: "center", lg: "left" }}>
              <Heading
                size="3xl"
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                Transforming IEP Development Through{' '}
                <Text as="span" color="brand">
                  Collaboration
                </Text>
              </Heading>

              <Text fontSize="xl" color="blue.50">
                CoIEP empowers educators to create high-quality, compliant Individualized Education Programs
                through intelligent collaboration.
              </Text>

              <HStack spacing={4} pt={4}>
                <Button
                  as="a"
                  href={`${APP_URL}/request-access`}
                  size="lg"
                  colorScheme="brand"
                >
                  Request Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </HStack>
            </VStack>

            {/* Chat Preview */}
            <Box
              bg={bgColor}
              borderRadius="lg"
              boxShadow="xl"
              overflow="hidden"
            >
              <Flex
                bg="brand.200"
                color="white"
                p={4}
                align="center"
                gap={3}
              >
                <Icon as={FaRobot} boxSize={6} />
                <Text fontWeight="bold">CoIEP Agent</Text>
                <Badge colorScheme="green" ml="auto">Online</Badge>
              </Flex>
              <VStack p={4} spacing={3} align="stretch">
                <Box
                  bg={bgGray100}
                  p={3}
                  borderRadius="md"
                >
                  <Text fontSize="sm">
                    I've analyzed Michael's reading assessment data. Would you like me to draft a PLAAFP statement?
                  </Text>
                </Box>
                <Box
                  bg={brandBg}
                  p={3}
                  borderRadius="md"
                  ml="auto"
                  maxW="80%"
                >
                  <Text fontSize="sm">Yes, please draft a statement for Michael.</Text>
                </Box>
                <Box
                  bg={bgGray100}
                  p={3}
                  borderRadius="md"
                >
                  <Text fontSize="sm" fontWeight="bold" mb={2}>Draft PLAAFP Statement:</Text>
                  <Text fontSize="sm">
                    Michael currently reads at a 2nd grade level for decoding and a 3rd grade level
                    for comprehension. He struggles with understanding main ideas in challenging texts
                    but excels with phonetic awareness...
                  </Text>
                </Box>
                <HStack
                  p={3}
                  borderWidth={1}
                  borderColor={borderColor}
                  borderRadius="md"
                >
                  <Input
                    placeholder="Ask a question about this student's IEP..."
                    variant="unstyled"
                    size="sm"
                    isReadOnly
                  />
                  <Icon as={FiSend} color="brand.500" cursor="pointer" />
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Divider />

      {/* Features Section */}
      <Container maxW="1200px" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color={headingColor}>
              About CoIEP
            </Heading>
            <Text fontSize="lg" color={subtextColor} maxW="2xl">
              CoIEP is an innovative platform that transforms the way educators create
              Individualized Education Programs through AI-powered collaboration.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            <Feature
              icon={FiZap}
              title="PLAAFP Statements"
              description="Craft measurable, achievable, and relevant goals aligned with student needs and educational standards."
            />
            <Feature
              icon={FiFileText}
              title="IEP Goals"
              description="Craft measurable, achievable, and relevant goals aligned with student needs and educational standards."
            />
            <Feature
              icon={FiUsers}
              title="Specially Designed Instruction"
              description="Develop tailored instructional approaches to address individual learning needs, strengths, and preferences."
            />
            <Feature
              icon={FiShield}
              title="Supplemental Aids & Services"
              description="Identify appropriate accommodations and modifications to support student success across educational settings."
            />
          </SimpleGrid>
        </VStack>
      </Container>

      {/* How It Works Section */}
      <Box id="how-it-works" bg={bgGray} py={20}>
        <Container maxW="1200px">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={headingColor}>
                How CoIEP Works
              </Heading>
              <Text fontSize="lg" color={subtextColor} maxW="3xl">
                Our multi-agent AI system collaborates with educators to create effective
                Individualized Education Programs
              </Text>
            </VStack>

            <VStack spacing={16} w="full">
              {/* Step 1 */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center" w="full">
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Box
                      bg="brand.500"
                      color="white"
                      borderRadius="full"
                      w={10}
                      h={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                    >
                      1
                    </Box>
                    <Heading size="lg">Input Student Data</Heading>
                  </HStack>
                  <Text color={subtextColor}>
                    Enter assessment results, observations, and other relevant information about
                    the student's current performance levels.
                  </Text>
                </VStack>
                <Box
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  borderWidth={1}
                  borderColor={borderColor}
                >
                  <HStack mb={4}>
                    <Icon as={FaFileAlt} color="brand.500" />
                    <Text fontWeight="bold">Student Information Form</Text>
                  </HStack>
                  <VStack align="stretch" spacing={2}>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">Reading Level:</Text>
                      <Text fontSize="sm">Grade 2.3 (Decoding), Grade 3.1 (Comprehension)</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">Math Level:</Text>
                      <Text fontSize="sm">Grade 3.5</Text>
                    </HStack>
                    <Box>
                      <Text fontWeight="medium" fontSize="sm">Areas of Need:</Text>
                      <Text fontSize="sm" color={subtextColor}>
                        Phonemic awareness, decoding multisyllabic words
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Step 2 */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center" w="full">
                <Box order={{ base: 1, md: 2 }}>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Box
                        bg="brand.500"
                        color="white"
                        borderRadius="full"
                        w={10}
                        h={10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                      >
                        2
                      </Box>
                      <Heading size="lg">AI Analysis & Recommendations</Heading>
                    </HStack>
                    <Text color={subtextColor}>
                      Our system analyzes student data to understand individual learning needs,
                      identify strengths and preferences, then creates specially designed instruction recommendations.
                    </Text>
                  </VStack>
                </Box>
                <Box
                  order={{ base: 2, md: 1 }}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  borderWidth={1}
                  borderColor={borderColor}
                >
                  <HStack mb={4}>
                    <Icon as={FaRobot} color="brand.500" />
                    <Text fontWeight="bold">AI Analysis</Text>
                  </HStack>
                  <VStack align="stretch" spacing={3}>
                    <Box>
                      <Text fontSize="sm" mb={1}>Analyzing student data against grade-level standards...</Text>
                      <Progress value={100} size="xs" colorScheme="brand" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>Identifying skill gaps and learning patterns...</Text>
                      <Progress value={100} size="xs" colorScheme="brand" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>Generating recommendations based on evidence-based practices...</Text>
                      <Progress value={100} size="xs" colorScheme="brand" />
                    </Box>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Step 3 */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center" w="full">
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Box
                      bg="brand.500"
                      color="white"
                      borderRadius="full"
                      w={10}
                      h={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                    >
                      3
                    </Box>
                    <Heading size="lg">Collaborative Refinement</Heading>
                  </HStack>
                  <Text color={subtextColor}>
                    Work with the AI to refine and customize the generated content, drawing on
                    your professional expertise and knowledge of the student.
                  </Text>
                </VStack>
                <Box
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  borderWidth={1}
                  borderColor={borderColor}
                >
                  <HStack mb={4}>
                    <Icon as={FiMessageSquare} color="brand.500" />
                    <Text fontWeight="bold">Collaborative Dialogue</Text>
                  </HStack>
                  <VStack align="stretch" spacing={2}>
                    <Box bg={bgGray100} p={3} borderRadius="md">
                      <Text fontSize="sm">
                        I've drafted an IEP goal focused on decoding multisyllabic words.
                        Would you like to adjust the accuracy percentage or add specific word types?
                      </Text>
                    </Box>
                    <Box bg={brandBg} p={3} borderRadius="md" ml="auto" maxW="85%">
                      <Text fontSize="sm">
                        Let's increase the accuracy to 85% and specifically target words with
                        prefixes and suffixes.
                      </Text>
                    </Box>
                    <Box bg={bgGray100} p={3} borderRadius="md">
                      <Text fontSize="sm">
                        Great suggestion. I've updated the goal to reflect these changes.
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Step 4 */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center" w="full">
                <Box order={{ base: 1, md: 2 }}>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Box
                        bg="brand.500"
                        color="white"
                        borderRadius="full"
                        w={10}
                        h={10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                      >
                        4
                      </Box>
                      <Heading size="lg">Finalize & Implement</Heading>
                    </HStack>
                    <Text color={subtextColor}>
                      Export your completed IEP components, ready for implementation in the classroom.
                    </Text>
                  </VStack>
                </Box>
                <Box
                  order={{ base: 2, md: 1 }}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  borderWidth={1}
                  borderColor={borderColor}
                >
                  <HStack mb={4}>
                    <Icon as={FiCheckCircle} color="green.500" />
                    <Text fontWeight="bold">Finalized IEP Components</Text>
                  </HStack>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">PLAAFP Statement</Text>
                      <Badge colorScheme="green">Complete</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">IEP Goals</Text>
                      <Badge colorScheme="green">Complete</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">Specially Designed Instruction</Text>
                      <Badge colorScheme="green">Complete</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontWeight="medium" fontSize="sm">Supplemental Aids & Services</Text>
                      <Badge colorScheme="green">Complete</Badge>
                    </HStack>
                  </VStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Usage Section */}
      <Box bg={bgGray} py={20}>
        <Container maxW="1200px">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={headingColor}>
                Generate and Evaluate IEP Components
              </Heading>
              <Text fontSize="lg" color={subtextColor} maxW="3xl">
                Explore the different IEP components our system can help develop and evaluate
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <Feature
                icon={FaFileAlt}
                title="Exemplary IEP Components"
                description={"Create high-quality IEP examples\nGenerate IEPs with detailed evaluation data\nSelect sample students from drop-down menus"}
              />
              <Feature
                icon={FiUpload}
                title="Anonymous Student Data"
                description={"Select basic learner characteristics for IEP creation\nUpload de-identified documents\nGenerate IEPs from anonymous data"}
              />
              <Feature
                icon={FiClipboard}
                title="Existing IEP Evaluation"
                description={"Evaluate existing IEP components\nReceive detailed quality feedback\nGet improvement suggestions"}
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bgGradient="linear(to-r, brand.500, brand.600)"
        color="white"
        py={20}
      >
        <Container maxW="1200px">
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl">
              Ready to Transform Your IEP Process?
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Join educators across the country who are using CoIEP to revolutionize
              their IEP creation process.
            </Text>
            <HStack spacing={4}>
              <Button
                as="a"
                href={`${APP_URL}/request-access`}
                size="lg"
                bg="white"
                color="brand.500"
                _hover={{ bg: 'gray.100' }}
              >
                Request Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box id="contact" py={20}>
        <Container maxW="600px">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color={headingColor}>
                Request More Information
              </Heading>
            </VStack>

            <Box w="full">
              <Stack spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Your name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="your.email@school.edu" />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input placeholder="e.g., Special Education Teacher, Administrator" />
                </FormControl>

                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    placeholder="Tell us about your needs and how we can help..."
                    rows={4}
                  />
                </FormControl>

                <Button colorScheme="brand" size="lg" w="full">
                  Submit
                </Button>
              </Stack>
            </Box>
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
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <VStack align="start" spacing={4}>
              <Heading size="md">
                <Text as="span" color="brand.500">Co</Text>
                <Text as="span" color={headingColor}>IEP</Text>
              </Heading>
              <Text color={subtextColor}>
                Transforming IEP development through collaboration
              </Text>
            </VStack>

            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" color={headingColor}>PRODUCT</Text>
              <Text color={subtextColor} _hover={{ color: 'brand.500' }} cursor="pointer"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                Features
              </Text>
              <Text color={subtextColor}>Pricing</Text>
              <Text color={subtextColor}>Case Studies</Text>
              <Text color={subtextColor}>Resources</Text>
            </VStack>

            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" color={headingColor}>LEGAL</Text>
              <Text color={subtextColor}>Privacy Policy</Text>
              <Text color={subtextColor}>Terms of Service</Text>
              <Text color={subtextColor}>Data Processing</Text>
              <Text color={subtextColor}>Accessibility</Text>
            </VStack>
          </SimpleGrid>

          <Divider my={8} />

          <Flex justify="center" align="center">
            <Text color={subtextColor}>
              &copy; 2025 CoIEP. All rights reserved.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
